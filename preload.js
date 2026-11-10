const { contextBridge, ipcRenderer } = require('electron');

// 通过 contextBridge 安全地暴露给渲染进程的 API
contextBridge.exposeInMainWorld('launcherAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
  login: (opts) => ipcRenderer.invoke('auth:login', opts),
  detectGame: (opts) => ipcRenderer.invoke('game:detect', opts),
  listGames: () => ipcRenderer.invoke('game:list'),
  launchGame: (opts) => ipcRenderer.invoke('game:launch', opts),
  openWgc: () => ipcRenderer.invoke('game:openWgc'),
  openLgc: () => ipcRenderer.invoke('game:openLgc'),
  getAccountStats: (opts) => ipcRenderer.invoke('wows:accountStats', opts),
  listMods: (opts) => ipcRenderer.invoke('mods:list', opts),
  toggleMod: (opts) => ipcRenderer.invoke('mods:toggle', opts),
  aslainInfo: () => ipcRenderer.invoke('mods:aslainInfo'),
  downloadAslain: (opts) => ipcRenderer.invoke('mods:download', opts),
  runInstaller: (opts) => ipcRenderer.invoke('mods:runInstaller', opts),
  getUpdateInfo: (opts) => ipcRenderer.invoke('game:updateInfo', opts),
  getUpdateProgress: (opts) => ipcRenderer.invoke('game:updateProgress', opts),
  getSpeedLimit: (opts) => ipcRenderer.invoke('gc:getSpeedLimit', opts),
  setSpeedLimit: (opts) => ipcRenderer.invoke('gc:setSpeedLimit', opts),
  getNews: (opts) => ipcRenderer.invoke('news:list', opts),
  openExternal: (opts) => ipcRenderer.invoke('app:openExternal', opts),
  createShortcut: () => ipcRenderer.invoke('app:createShortcut'),
  checkUpdate: () => ipcRenderer.invoke('app:checkUpdate'),
  downloadUpdate: () => ipcRenderer.invoke('app:downloadUpdate'),
  installUpdate: () => ipcRenderer.invoke('app:installUpdate'),
  onUpdateStatus: (cb) => ipcRenderer.on('update:status', (e, data) => cb(data))
});
