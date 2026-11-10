const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const https = require('https');
const http = require('http');
const { autoUpdater } = require('electron-updater');

// 获取图标真实路径：开发模式用项目目录，打包后从 asar.unpacked 读取
function appIconPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'app.asar.unpacked', 'build', 'icon.ico');
  }
  return path.join(__dirname, 'build', 'icon.ico');
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    frame: false, // 使用自定义标题栏
    backgroundColor: '#070d16',
    icon: appIconPath(),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ---- 窗口控制（自定义标题栏）----
ipcMain.on('window:minimize', (e) => {
  BrowserWindow.fromWebContents(e.sender)?.minimize();
});

ipcMain.on('window:maximize', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  if (!win) return;
  win.isMaximized() ? win.unmaximize() : win.maximize();
});

ipcMain.on('window:close', (e) => {
  BrowserWindow.fromWebContents(e.sender)?.close();
});

ipcMain.handle('window:isMaximized', (e) => {
  return BrowserWindow.fromWebContents(e.sender)?.isMaximized() ?? false;
});

// ---- Wargaming OpenID 登录 ----
const REGION_HOSTS = {
  eu: 'api.worldoftanks.eu',
  na: 'api.worldoftanks.com',
  asia: 'api.worldoftanks.asia',
  ru: 'api.worldoftanks.ru'
};

// 必须与 developers.wargaming.net 应用注册时填写的 redirect_uri 完全一致
const AUTH_REDIRECT_URI = 'http://localhost:8765/callback';

ipcMain.handle('auth:login', async (e, opts = {}) => {
  const applicationId = String(opts.applicationId || '').trim();
  const region = REGION_HOSTS[opts.region] ? opts.region : 'asia';

  if (!applicationId) {
    return { error: '缺少 Application ID，请先在 developers.wargaming.net 注册应用。' };
  }

  const host = REGION_HOSTS[region];
  // 请求长期令牌，有效期最长 2 周
  const expiresAt = Math.floor(Date.now() / 1000) + 14 * 24 * 3600;
  const loginUrl =
    `https://${host}/wot/auth/login/` +
    `?application_id=${encodeURIComponent(applicationId)}` +
    `&redirect_uri=${encodeURIComponent(AUTH_REDIRECT_URI)}` +
    `&nofollow=0&display=page&expires_at=${expiresAt}`;

  return new Promise((resolve) => {
    const win = new BrowserWindow({
      width: 520,
      height: 700,
      parent: BrowserWindow.fromWebContents(e.sender) ?? undefined,
      autoHideMenuBar: true,
      title: 'Wargaming 登录',
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true
      }
    });

    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      if (!win.isDestroyed()) win.close();
      resolve(result);
    };

    const handleRedirect = (event, url) => {
      if (!url.startsWith(AUTH_REDIRECT_URI)) return;
      event.preventDefault();
      const params = new URL(url).searchParams;
      const status = params.get('status');
      if (status === 'ok') {
        finish({
          status: 'ok',
          access_token: params.get('access_token'),
          expires_at: Number(params.get('expires_at')) || expiresAt,
          nickname: params.get('nickname'),
          account_id: params.get('account_id')
        });
      } else {
        finish({ status: 'fail', error: '登录失败或已被取消' });
      }
    };

    // 兼容服务端 302 与页面 JS 跳转两种情况
    win.webContents.on('will-redirect', handleRedirect);
    win.webContents.on('will-navigate', handleRedirect);

    win.on('closed', () => finish({ status: 'cancelled' }));

    win.loadURL(loginUrl).catch((err) => finish({ error: err.message }));
  });
});

// ---- 游戏客户端检测与启动 ----
const { spawn, execSync } = require('child_process');
const fs = require('fs');

const GAME_EXE = 'WorldOfWarships.exe';
const LESTA_EXE = 'Korabli.exe';

const CLIENT_LABELS = {
  wg: '国际服 (WG)',
  lesta: '俄服 (Lesta)',
  cn: '国服 (360)'
};

function detectClientType(root) {
  const name = path.basename(root).toLowerCase();
  if (fs.existsSync(path.join(root, 'Korabli.exe')) || fs.existsSync(path.join(root, 'lgc_api2.dll'))) {
    return 'lesta';
  }
  if (/cn360|360|_cn|国服/.test(name)) {
    return 'cn';
  }
  return 'wg';
}

// 客户端体系 → 区服：lesta → ru（俄服，固定），cn → cn（国服，固定），wg → wg（单一客户端，区服跟随账号）
function detectRegion(root, type) {
  if (type === 'lesta') return 'ru';
  if (type === 'cn') return 'cn';
  return 'wg';
}

function getCandidateRoots() {
  const roots = new Set();
  const drives = [];
  for (let c = 65; c <= 90; c++) {
    const d = String.fromCharCode(c) + ':\\';
    if (fs.existsSync(d)) drives.push(d);
  }

  for (const drive of drives) {
    // Games 目录下的所有子目录
    const gamesDir = path.join(drive, 'Games');
    if (fs.existsSync(gamesDir)) {
      try {
        for (const sub of fs.readdirSync(gamesDir)) {
          roots.add(path.join(gamesDir, sub));
        }
      } catch {}
    }
    // 盘符根目录下直接以 World of Warships / Korabli 命名的目录
    try {
      for (const sub of fs.readdirSync(drive)) {
        if (/^world[\s_]?of[\s_]?warships/i.test(sub) || /^korabli/i.test(sub)) {
          roots.add(path.join(drive, sub));
        }
      }
    } catch {}
  }

  // Steam 库目录
  const steamBases = [
    path.join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Steam', 'steamapps', 'common'),
    path.join(process.env['PROGRAMFILES'] || 'C:\\Program Files', 'Steam', 'steamapps', 'common')
  ];
  for (const drive of drives) {
    steamBases.push(path.join(drive, 'SteamLibrary', 'steamapps', 'common'));
  }
  for (const base of steamBases) {
    if (!fs.existsSync(base)) continue;
    try {
      for (const sub of fs.readdirSync(base)) {
        if (/world[\s_]?of[\s_]?warships/i.test(sub)) {
          roots.add(path.join(base, sub));
        }
      }
    } catch {}
  }

  return [...roots];
}

function findGameExe(root) {
  if (!root) return null;
  const isLesta = fs.existsSync(path.join(root, 'Korabli.exe'));

  // 真正的游戏客户端位于 bin/<最新数字版本>/bin64（或 bin32），根目录的 exe 只是引导器
  const binDir = path.join(root, 'bin');
  if (fs.existsSync(binDir)) {
    let latest = null;
    try {
      for (const entry of fs.readdirSync(binDir)) {
        if (/^\d+$/.test(entry)) {
          const num = parseInt(entry, 10);
          if (latest === null || num > latest) latest = num;
        }
      }
    } catch {}
    if (latest !== null) {
      const base = path.join(binDir, String(latest));
      const names = isLesta
        ? ['Korabli64.exe', 'Korabli.exe']
        : ['WorldOfWarships64.exe', 'WorldOfWarships.exe'];
      for (const sub of ['bin64', 'bin32', '']) {
        for (const name of names) {
          const p = path.join(base, sub, name);
          if (fs.existsSync(p)) return p;
        }
      }
    }
  }

  // 兜底：根目录与旧路径
  const exeName = isLesta ? LESTA_EXE : GAME_EXE;
  const candidates = [
    path.join(root, exeName),
    path.join(root, 'bin64', exeName),
    path.join(root, 'bin', exeName)
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function detectGame(customPath) {
  if (customPath) {
    const exe = findGameExe(customPath);
    if (exe) {
      const type = detectClientType(customPath);
      return { found: true, root: customPath, exe, type, region: detectRegion(customPath, type) };
    }
  }
  for (const root of getCandidateRoots()) {
    const exe = findGameExe(root);
    if (exe) {
      const type = detectClientType(root);
      return { found: true, root, exe, type, region: detectRegion(root, type) };
    }
  }
  return { found: false, root: null, exe: null, type: null, region: null };
}

function detectGames() {
  const results = [];
  const seen = new Set();
  for (const root of getCandidateRoots()) {
    if (seen.has(root)) continue;
    seen.add(root);
    const exe = findGameExe(root);
    if (exe) {
      const type = detectClientType(root);
      results.push({ root, exe, type, label: CLIENT_LABELS[type] || '未知', region: detectRegion(root, type) });
    }
  }
  return results;
}

function findWgcExe() {
  const candidates = [
    path.join(process.env.PROGRAMDATA || 'C:\\ProgramData', 'Wargaming.net', 'GameCenter', 'wgc.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Wargaming.net', 'GameCenter', 'wgc.exe'),
    path.join(process.env.PROGRAMFILES || 'C:\\Program Files', 'Wargaming.net', 'GameCenter', 'wgc.exe')
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function isProcessRunning(name) {
  try {
    const out = execSync(`tasklist /FI "IMAGENAME eq ${name}"`, { encoding: 'utf8', windowsHide: true });
    return out.toLowerCase().includes(name.toLowerCase());
  } catch {
    return false;
  }
}

function isWgcClient(root) {
  const markers = [
    path.join(root, 'wgc_api.dll'),
    path.join(root, 'bin', 'wgc_api.dll'),
    path.join(root, 'bin64', 'wgc_api.dll'),
    path.join(root, 'bin', 'bin64', 'wgc_api.dll')
  ];
  return markers.some((p) => fs.existsSync(p));
}

function gameCenterWindow(processName, mode) {
  try {
    const script = path.join(__dirname, 'scripts', 'gamecenter-window.ps1');
    spawn('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, '-Mode', mode, '-ProcessName', processName], {
      windowsHide: true,
      detached: true,
      stdio: 'ignore'
    }).unref();
  } catch {}
}

function hideWgcWindow() {
  gameCenterWindow('wgc', 'hide');
}

function showWgcWindow() {
  gameCenterWindow('wgc', 'show');
}

function hideLgcWindow() {
  gameCenterWindow('lgc', 'hide');
}

function showLgcWindow() {
  gameCenterWindow('lgc', 'show');
}

function findLgcExe() {
  const candidates = [
    path.join(process.env.PROGRAMDATA || 'C:\\ProgramData', 'Lesta', 'GameCenter', 'lgc.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Lesta', 'GameCenter', 'lgc.exe'),
    path.join(process.env.PROGRAMFILES || 'C:\\Program Files', 'Lesta', 'GameCenter', 'lgc.exe')
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

ipcMain.handle('game:detect', async (e, opts = {}) => {
  return detectGame(opts.customPath);
});

ipcMain.handle('game:list', async () => {
  return { ok: true, clients: detectGames() };
});

ipcMain.handle('game:launch', async (e, opts = {}) => {
  let result;

  // 优先按当前区服动态选择对应客户端：ru → Lesta，cn → 国服，asia/eu/na → WG 单一客户端
  if (opts.region) {
    let client;
    if (opts.region === 'ru') {
      client = detectGames().find((c) => c.type === 'lesta');
    } else if (opts.region === 'cn') {
      client = detectGames().find((c) => c.type === 'cn');
    } else {
      client = detectGames().find((c) => c.type === 'wg');
    }
    if (!client) {
      return { ok: false, error: `未找到区服「${opts.region}」对应的游戏客户端，请确认客户端已安装，或到「设置 → 游戏客户端」手动指定。` };
    }
    result = { found: true, root: client.root, exe: client.exe, type: client.type, region: opts.region };
  } else {
    result = detectGame(opts.customPath);
    if (!result.found) {
      return { ok: false, error: '未检测到游戏客户端，请到「设置 → 游戏客户端」手动指定安装目录。' };
    }
  }

  // WG 端客户端需要 WGC 提供登录凭证
  if (isWgcClient(result.root)) {
    const wgcExe = findWgcExe();
    // 先启动隐藏轮询，确保 WGC 一出现窗口就被隐藏
    hideWgcWindow();
    if (wgcExe && !isProcessRunning('wgc.exe')) {
      try {
        const wgc = spawn(wgcExe, [], { detached: true, stdio: 'ignore', windowsHide: true });
        wgc.unref();
        // 给 WGC 一点时间启动并让其本地服务就绪（隐藏脚本已在后台轮询）
        await new Promise((r) => setTimeout(r, 2000));
      } catch {}
    }
  }

  // Lesta 端客户端需要 LGC 提供登录凭证
  if (result.type === 'lesta') {
    const lgcExe = findLgcExe();
    // 先启动隐藏轮询，确保 LGC 一出现窗口就被隐藏
    hideLgcWindow();
    if (lgcExe && !isProcessRunning('lgc.exe')) {
      try {
        const lgc = spawn(lgcExe, [], { detached: true, stdio: 'ignore', windowsHide: true });
        lgc.unref();
        // 给 LGC 一点时间启动并让其本地服务就绪（隐藏脚本已在后台轮询）
        await new Promise((r) => setTimeout(r, 2000));
      } catch {}
    }
  }

  try {
    const child = spawn(result.exe, [], {
      cwd: path.dirname(result.exe),
      detached: true,
      stdio: 'ignore'
    });
    child.unref();
    return { ok: true, exe: result.exe };
  } catch (err) {
    return { ok: false, error: '启动失败: ' + err.message };
  }
});

ipcMain.handle('game:openWgc', async () => {
  const wgcExe = findWgcExe();
  if (!wgcExe) {
    return { ok: false, error: '未找到 WGC 安装（通常在 C:\\ProgramData\\Wargaming.net\\GameCenter\\）。' };
  }
  try {
    if (!isProcessRunning('wgc.exe')) {
      const wgc = spawn(wgcExe, [], { detached: true, stdio: 'ignore' });
      wgc.unref();
    }
    showWgcWindow();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('game:openLgc', async () => {
  const lgcExe = findLgcExe();
  if (!lgcExe) {
    return { ok: false, error: '未找到 LGC 安装（通常在 C:\\ProgramData\\Lesta\\GameCenter\\）。' };
  }
  try {
    if (!isProcessRunning('lgc.exe')) {
      const lgc = spawn(lgcExe, [], { detached: true, stdio: 'ignore' });
      lgc.unref();
    }
    showLgcWindow();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// ---- WoWS 战绩查询 ----
const WOWS_HOSTS = {
  eu: 'api.worldofwarships.eu',
  na: 'api.worldofwarships.com',
  asia: 'api.worldofwarships.asia',
  ru: 'api.worldofwarships.ru'
};

ipcMain.handle('wows:accountStats', async (e, opts = {}) => {
  const applicationId = String(opts.applicationId || '').trim();
  const accountId = String(opts.accountId || '').trim();
  const accessToken = String(opts.accessToken || '');
  const region = WOWS_HOSTS[opts.region] ? opts.region : 'asia';

  if (!applicationId || !accountId) {
    return { status: 'error', error: '缺少 application_id 或 account_id' };
  }

  const host = WOWS_HOSTS[region];
  const url =
    `https://${host}/wows/account/info/` +
    `?application_id=${encodeURIComponent(applicationId)}` +
    `&account_id=${encodeURIComponent(accountId)}` +
    `&access_token=${encodeURIComponent(accessToken)}`;

  try {
    return await httpGetJson(url);
  } catch (err) {
    return { status: 'error', error: err.message };
  }
});

// ---- Mod 管理 ----
function findResModsDir(root) {
  if (!root) return null;
  const binDir = path.join(root, 'bin');
  if (!fs.existsSync(binDir)) return null;

  let latest = null;
  try {
    for (const entry of fs.readdirSync(binDir)) {
      if (/^\d+$/.test(entry)) {
        const num = parseInt(entry, 10);
        if (latest === null || num > latest) latest = num;
      }
    }
  } catch {}
  if (latest === null) return null;

  const resMods = path.join(binDir, String(latest), 'res_mods');
  if (!fs.existsSync(resMods)) {
    try {
      fs.mkdirSync(resMods, { recursive: true });
    } catch {}
  }
  return resMods;
}

function listMods(resModsDir) {
  const mods = [];
  const offDir = resModsDir + '_off';
  const read = (dir, enabled) => {
    if (!fs.existsSync(dir)) return;
    try {
      for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (fs.statSync(full).isDirectory()) {
          mods.push({ name: entry, enabled });
        }
      }
    } catch {}
  };
  read(resModsDir, true);
  read(offDir, false);
  return mods.sort((a, b) => a.name.localeCompare(b.name));
}

function toggleMod(resModsDir, name, enabled) {
  const onPath = path.join(resModsDir, name);
  const offDir = resModsDir + '_off';
  const offPath = path.join(offDir, name);

  if (enabled) {
    if (fs.existsSync(offPath)) {
      fs.mkdirSync(resModsDir, { recursive: true });
      fs.renameSync(offPath, onPath);
    }
  } else {
    if (fs.existsSync(onPath)) {
      fs.mkdirSync(offDir, { recursive: true });
      fs.renameSync(onPath, offPath);
    }
  }
}

function collectModFiles(dir, modName, map, base) {
  if (!base) base = dir;
  let entries;
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const rel = path.relative(base, full).replace(/\\/g, '/');
    let isDir = false;
    try {
      isDir = fs.statSync(full).isDirectory();
    } catch {
      continue;
    }
    if (isDir) {
      collectModFiles(full, modName, map, base);
    } else {
      if (!map[rel]) map[rel] = [];
      map[rel].push(modName);
    }
  }
}

function detectConflicts(resModsDir) {
  const map = {};
  const entries = fs.existsSync(resModsDir) ? fs.readdirSync(resModsDir) : [];
  for (const entry of entries) {
    const full = path.join(resModsDir, entry);
    let isDir = false;
    try {
      isDir = fs.statSync(full).isDirectory();
    } catch {
      continue;
    }
    if (isDir) collectModFiles(full, entry, map);
  }
  const conflicts = [];
  for (const rel of Object.keys(map)) {
    if (map[rel].length > 1) {
      conflicts.push({ file: rel, mods: map[rel] });
    }
  }
  return conflicts;
}

function getModContext(customPath) {
  const game = detectGame(customPath || null);
  const resModsDir = game.found ? findResModsDir(game.root) : null;
  return { root: game.root, resModsDir };
}

ipcMain.handle('mods:list', async (e, opts = {}) => {
  const ctx = getModContext(opts.root);
  if (!ctx.resModsDir) {
    return { ok: false, error: '未找到游戏 mod 目录，请先在设置页定位游戏客户端。', mods: [], conflicts: [], resModsDir: null };
  }
  return {
    ok: true,
    mods: listMods(ctx.resModsDir),
    conflicts: detectConflicts(ctx.resModsDir),
    resModsDir: ctx.resModsDir
  };
});

ipcMain.handle('mods:toggle', async (e, opts = {}) => {
  const ctx = getModContext(opts.root);
  if (!ctx.resModsDir) {
    return { ok: false, error: '未找到游戏 mod 目录。' };
  }
  try {
    toggleMod(ctx.resModsDir, opts.name, opts.enabled);
    return {
      ok: true,
      mods: listMods(ctx.resModsDir),
      conflicts: detectConflicts(ctx.resModsDir)
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// ---- Aslain 整合包下载 ----
const ASLAIN_TOPIC = 'https://aslain.com/index.php?/topic/2020-download-%E2%98%85-world-of-warships-%E2%98%85-modpack/';

ipcMain.handle('mods:aslainInfo', async () => {
  try {
    const html = (await httpGetText(ASLAIN_TOPIC)).body;
    const links = html.match(/https?:\/\/[^\s"']+\.exe/gi) || [];
    const installer =
      links.find((u) => u.includes('Modpack_Installer')) ||
      links.find((u) => u.includes('filez.aslain.com')) ||
      links[0] ||
      null;
    let version = null;
    if (installer) {
      const m = installer.match(/v\.?(\d+\.\d+\.\d+[._]\d+)/i);
      if (m) version = m[1];
    }
    return { ok: true, installer, version };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('mods:download', async (e, opts = {}) => {
  const url = String(opts.url || '');
  if (!url) return { ok: false, error: '缺少下载地址' };
  let name = 'Aslain_WoWs_Modpack_Installer.exe';
  try {
    name = path.basename(new URL(url).pathname) || name;
  } catch {}
  const dest = path.join(app.getPath('downloads'), name);
  try {
    await httpDownload(url, dest);
    return { ok: true, dest };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('mods:runInstaller', async (e, opts = {}) => {
  const dest = String(opts.dest || '');
  if (!dest || !fs.existsSync(dest)) return { ok: false, error: '安装程序不存在' };
  try {
    const child = spawn(dest, [], { detached: true, stdio: 'ignore' });
    child.unref();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// ---- 游戏更新检测 ----
function parseVersion(v) {
  return String(v || '').split('.').map((n) => parseInt(n, 10) || 0);
}

function compareVersion(a, b) {
  const va = parseVersion(a);
  const vb = parseVersion(b);
  const len = Math.max(va.length, vb.length);
  for (let i = 0; i < len; i++) {
    const x = va[i] || 0;
    const y = vb[i] || 0;
    if (x !== y) return x - y;
  }
  return 0;
}

// 各发行方 patches_chain 的元数据参数（WGC/LGC 客户端内部缓存的固定值）
const UPDATE_META = {
  wargaming: { metadata_version: '20251121135024', metadata_protocol_version: '7.10' },
  lesta: { metadata_version: '20250109145810', metadata_protocol_version: '7.6' }
};

function parseGameInfo(xml) {
  const get = (re) => (xml.match(re) || [])[1] || '';
  const info = {
    publisher: get(/wgc_publisher_id="([^"]+)"/i),
    gameId: get(/<id>([^<]+)<\/id>/i),
    clientType: get(/<client_type>([^<]+)<\/client_type>/i) || 'high',
    localization: get(/<localization>([^<]+)<\/localization>/i) || 'ZH_SG',
    updateUrl: get(/<update_urls>[\s\S]*?<value>([^<]+)<\/value>/i),
    versions: {}
  };
  const partRe = /<version\b([^>]*)\/>/g;
  let m;
  while ((m = partRe.exec(xml)) !== null) {
    const attrs = m[1];
    const name = attrs.match(/name="([^"]+)"/i)?.[1];
    const installed = attrs.match(/installed="([^"]+)"/i)?.[1];
    const available = attrs.match(/available="([^"]+)"/i)?.[1];
    if (name && installed) info.versions[name] = { installed, available: available || installed };
  }
  return info;
}

// 实时查询 patches_chain，返回服务器最新客户端版本；失败返回 null
async function fetchLatestVersion(info) {
  if (!info.updateUrl || !info.gameId) return null;
  const meta = UPDATE_META[info.publisher] || UPDATE_META.wargaming;
  try {
    const params = new URLSearchParams({
      game_id: info.gameId,
      protocol_version: '1.11',
      metadata_version: meta.metadata_version,
      metadata_protocol_version: meta.metadata_protocol_version,
      client_type: info.clientType,
      lang: info.localization,
      chain_id: 'f21',
      game_installation: 'false',
      gc_publisher: info.publisher || 'wargaming',
      client_current_version: info.versions.client?.installed || '',
      hotfix_current_version: info.versions.hotfix?.installed || '',
      locale_current_version: info.versions.locale?.installed || '',
      sdcontent_current_version: info.versions.sdcontent?.installed || ''
    });
    const url = `${info.updateUrl.replace(/\/$/, '')}/api/v1/patches_chain/?${params}`;
    const { status, body } = await httpGetText(url);
    if (status < 200 || status >= 300) return null;
    return body.match(/<name>client<\/name>\s*<version>([^<]+)<\/version>/i)?.[1] || null;
  } catch {
    return null;
  }
}

// 检测游戏更新：实时查询 patches_chain，失败则回退到 Game Center 缓存的 available
ipcMain.handle('game:updateInfo', async (e, opts = {}) => {
  const root = String(opts.root || '');
  if (!root) return { ok: false, error: '未指定游戏目录' };
  const infoFile = path.join(root, 'game_info.xml');
  if (!fs.existsSync(infoFile)) {
    return { ok: false, error: '未找到 game_info.xml（可能尚未通过 Game Center 导入）' };
  }
  try {
    const info = parseGameInfo(fs.readFileSync(infoFile, 'utf8'));
    const installed = info.versions.client?.installed || '';
    if (!installed) return { ok: false, error: '未找到已安装版本' };
    const cachedAvailable = info.versions.client?.available || '';

    const live = await fetchLatestVersion(info);
    const latest = live || cachedAvailable || installed;
    const hasUpdate = compareVersion(latest, installed) > 0;
    return { ok: true, installed, available: latest, hasUpdate, liveCheck: Boolean(live) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// ---- 下载进度（监控 update_data 目录）----
function dirSize(dir) {
  let total = 0;
  let files = 0;
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const sub = dirSize(full);
        total += sub.total;
        files += sub.files;
      } else if (entry.isFile()) {
        try {
          total += fs.statSync(full).size;
          files++;
        } catch {}
      }
    }
  } catch {}
  return { total, files };
}

ipcMain.handle('game:updateProgress', async (e, opts = {}) => {
  const root = String(opts.root || '');
  if (!root) return { ok: false, error: '未指定游戏目录' };
  const updateData = path.join(root, 'update_data');
  if (!fs.existsSync(updateData)) {
    return { ok: true, active: false, bytes: 0, files: 0 };
  }
  const size = dirSize(updateData);
  return { ok: true, active: true, bytes: size.total, files: size.files };
});

// ---- 下载限速（读写 Game Center preferences.xml）----
function gameCenterPrefsPath(kind) {
  const base = kind === 'lesta'
    ? path.join(process.env.PROGRAMDATA || 'C:\\ProgramData', 'Lesta', 'GameCenter')
    : path.join(process.env.PROGRAMDATA || 'C:\\ProgramData', 'Wargaming.net', 'GameCenter');
  return path.join(base, 'preferences.xml');
}

ipcMain.handle('gc:getSpeedLimit', async (e, opts = {}) => {
  const kind = opts.kind === 'lesta' ? 'lesta' : 'wg';
  const prefs = gameCenterPrefsPath(kind);
  if (!fs.existsSync(prefs)) return { ok: false, error: '未找到 Game Center 配置文件' };
  try {
    const xml = fs.readFileSync(prefs, 'utf8');
    const m = xml.match(/<download_speed_limit>([^<]+)<\/download_speed_limit>/i);
    const value = m ? parseInt(m[1], 10) : -1;
    return { ok: true, speedLimit: value };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('gc:setSpeedLimit', async (e, opts = {}) => {
  const kind = opts.kind === 'lesta' ? 'lesta' : 'wg';
  const speed = Number(opts.speed);
  if (!Number.isFinite(speed) || speed < -1) return { ok: false, error: '无效的限速值' };
  const prefs = gameCenterPrefsPath(kind);
  if (!fs.existsSync(prefs)) return { ok: false, error: '未找到 Game Center 配置文件' };
  try {
    const xml = fs.readFileSync(prefs, 'utf8');
    const next = xml.replace(/(<download_speed_limit>)[^<]*(<\/download_speed_limit>)/i, `$1${speed}$2`);
    fs.writeFileSync(prefs, next, 'utf8');
    return { ok: true, speedLimit: speed };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// ---- HTTP 工具（主进程用 Node 原生 http/https，规避 fetch 兼容问题）----
function httpGetText(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https://') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': '*/*' }
    }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (c) => { data += c; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => req.destroy(new Error('请求超时')));
  });
}

async function httpGetJson(url) {
  const r = await httpGetText(url);
  if (r.status < 200 || r.status >= 300) {
    throw new Error('HTTP ' + r.status);
  }
  return JSON.parse(r.body);
}

function httpDownload(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https://') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.resume();
        reject(new Error('下载失败: HTTP ' + res.statusCode));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
      file.on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
    });
    req.on('error', reject);
    req.setTimeout(120000, () => req.destroy(new Error('下载超时')));
  });
}

// ---- 官方新闻 ----
const NEWS_SOURCES = {
  asia: { viewCode: 'sg.wows.installedGame.default-installed' },
  eu: { viewCode: 'eu.wows.installedGame.default-installed' },
  na: { viewCode: 'us.wows.installedGame.default-installed' }
};

function newsLocale(region, lang) {
  if (region === 'asia' && lang === 'zh') return 'zh_sg';
  return 'en';
}

async function fetchWgNews(region, lang) {
  const src = NEWS_SOURCES[region];
  if (!src) return [];
  const url = `https://chubapi.wgprod.net/api/v3/getContent?view_code=${src.viewCode}&locale=${newsLocale(region, lang)}&country_code=cn`;
  let json;
  try {
    json = await httpGetJson(url);
  } catch {
    return [];
  }
  const news = [];
  for (const tile of json.tiles || []) {
    if (!Array.isArray(tile.content)) continue;
    for (const item of tile.content) {
      if (item.type === 'news') {
        news.push({
          title: item.title || '',
          description: item.description || '',
          image: item.preview || '',
          url: item.source || '',
          date: item.published_at || '',
          category: item.category?.title || ''
        });
      }
    }
  }
  return news;
}

function slugToTitle(url) {
  try {
    const slug = new URL(url).pathname.split('/').filter(Boolean).pop() || '';
    const clean = slug.replace(/-\d{1,2}-\d{1,2}$/, '').replace(/[-_]/g, ' ').trim();
    if (!clean) return url;
    return clean.replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return url;
  }
}

function collectLestaNews(node, out) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach((n) => collectLestaNews(n, out));
    return;
  }
  if (typeof node.name === 'string' && /news/i.test(node.name) && Array.isArray(node.content)) {
    for (const item of node.content) {
      if (item && item.link) {
        out.push({
          title: item.title || slugToTitle(item.link),
          description: '',
          image: item.image || '',
          url: item.link,
          date: '',
          category: ''
        });
      }
    }
  }
  for (const key of Object.keys(node)) {
    collectLestaNews(node[key], out);
  }
}

async function fetchLestaNews() {
  const url = 'https://lstuscs-ru.lesta.ru/api/v21/content/installed_game/?lang=RU&gameid=MK.RU.PRODUCTION&format=json&gc_publisher_id=lesta&country_code=BY&category_id=default';
  let json;
  try {
    json = await httpGetJson(url);
  } catch {
    return [];
  }
  const out = [];
  collectLestaNews(json.data?.layout, out);
  const seen = new Set();
  return out.filter((n) => (seen.has(n.url) ? false : (seen.add(n.url), true)));
}

ipcMain.handle('news:list', async (e, opts = {}) => {
  const region = opts.region || 'asia';
  const lang = opts.lang || 'zh';
  console.log('[news:list] region =', region, ', lang =', lang);
  try {
    const news = region === 'ru' ? await fetchLestaNews() : await fetchWgNews(region, lang);
    console.log('[news:list] news count =', news.length);
    return { ok: true, news };
  } catch (err) {
    console.log('[news:list] error =', err.message);
    return { ok: false, error: err.message, news: [] };
  }
});

ipcMain.handle('app:openExternal', async (e, opts = {}) => {
  const url = String(opts.url || '');
  if (!/^https?:\/\//i.test(url)) return { ok: false, error: '无效链接' };
  try {
    await shell.openExternal(url);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// ---- 创建桌面快捷方式 ----
function psQuote(s) {
  return "'" + String(s).replace(/'/g, "''") + "'";
}

ipcMain.handle('app:createShortcut', async () => {
  const desktopDir = app.getPath('desktop');
  const lnkPath = path.join(desktopDir, 'WoWS Launcher.lnk');
  const exePath = process.execPath; // 打包后指向安装目录的 exe
  const iconPath = appIconPath();
  const workDir = app.isPackaged ? path.dirname(process.execPath) : __dirname;
  const args = app.isPackaged ? '' : '"' + __dirname + '"';

  const script = [
    '$WshShell = New-Object -ComObject WScript.Shell',
    `$Shortcut = $WshShell.CreateShortcut(${psQuote(lnkPath)})`,
    `$Shortcut.TargetPath = ${psQuote(exePath)}`,
    `$Shortcut.Arguments = ${psQuote(args)}`,
    `$Shortcut.IconLocation = ${psQuote(iconPath + ',0')}`,
    `$Shortcut.WorkingDirectory = ${psQuote(workDir)}`,
    `$Shortcut.Description = 'WoWS Launcher'`,
    '$Shortcut.Save()'
  ].join('; ');

  try {
    const encoded = Buffer.from(script, 'utf16le').toString('base64');
    await new Promise((resolve, reject) => {
      const child = spawn('powershell', ['-NoProfile', '-NonInteractive', '-EncodedCommand', encoded], { windowsHide: true });
      child.on('error', reject);
      child.on('close', (code) => (code === 0 ? resolve() : reject(new Error('PowerShell 退出码 ' + code))));
    });
    return { ok: true, path: lnkPath };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// ---- 自动更新 ----
function broadcastUpdate(data) {
  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send('update:status', data);
  }
}

autoUpdater.autoDownload = false; // 手动下载，让用户确认
autoUpdater.autoInstallOnAppQuit = true; // 退出时自动安装

autoUpdater.on('checking-for-update', () => broadcastUpdate({ state: 'checking' }));
autoUpdater.on('update-available', (info) => broadcastUpdate({ state: 'available', version: info.version, releaseNotes: info.releaseNotes }));
autoUpdater.on('update-not-available', (info) => broadcastUpdate({ state: 'not-available', version: info.version }));
autoUpdater.on('download-progress', (p) => broadcastUpdate({ state: 'progress', percent: p.percent, transferred: p.transferred, total: p.total, bytesPerSecond: p.bytesPerSecond }));
autoUpdater.on('update-downloaded', (info) => broadcastUpdate({ state: 'downloaded', version: info.version }));
autoUpdater.on('error', (err) => broadcastUpdate({ state: 'error', message: err.message }));

ipcMain.handle('app:checkUpdate', async () => {
  if (!app.isPackaged) {
    return { ok: false, error: '开发模式下不支持自动更新，请使用打包后的安装版' };
  }
  try {
    const result = await autoUpdater.checkForUpdates();
    return { ok: true, version: (result && result.updateInfo && result.updateInfo.version) || null };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('app:downloadUpdate', async () => {
  try {
    await autoUpdater.downloadUpdate();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('app:installUpdate', async () => {
  try {
    autoUpdater.quitAndInstall(false, true);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});
