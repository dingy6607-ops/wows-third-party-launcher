# WoWS Launcher

**《战舰世界》非官方第三方启动器（增强外壳）** · MIT 开源 · 仅支持 Windows x64

> [!WARNING]
> 本项目是社区爱好作品，**与 Wargaming.net、Lesta Studio 及其关联方没有任何关联，也未获得其授权、认可或背书**。
> 使用第三方工具可能违反游戏的服务条款，由此产生的账号限制、封禁或其他后果由使用者自行承担。
> 使用前请阅读 [用户协议](TERMS.md) 与 [免责条款](DISCLAIMER.md)。

## 简介

WoWS Launcher 是一个基于 Electron 的桌面启动器外壳，把「选择区服 — 查看新闻 — 启动游戏 — 管理模组 — 检查更新」集中到一个界面里。

它**不替代也不修改**官方 Game Center：游戏本体的安装、更新与账号登录仍由官方 WGC / LGC 完成，本启动器只是在此之上提供一个统一入口，并直接启动真正的游戏客户端可执行文件。

**English summary:** An unofficial, open-source (MIT) launcher shell for World of Warships on Windows. It does not modify game files, inject into the game process, or replace the official Game Center. Not affiliated with or endorsed by Wargaming.net or Lesta Studio. See [TERMS.md](TERMS.md) and [DISCLAIMER.md](DISCLAIMER.md).

## 功能特性

| 功能 | 说明 |
|------|------|
| 多区服 | 国际服亚服 / 欧服 / 美服（WG）与俄服（Lesta），一键切换 |
| 一键启动 | 后台拉起官方 Game Center 提供登录凭证，直接运行游戏本体 `WorldOfWarships64.exe` |
| 官方新闻 | 聚合各服官方新闻，亚服支持中文，点击跳转官网原文 |
| 账号与战绩 | 可选：通过 Wargaming OpenID 登录，查看战绩概览 |
| 模组管理 | 查看 / 启用 / 停用模组；下载 Aslain's 整合包安装程序 |
| 更新检测 | 读取 `game_info.xml` 并实时查询官方 `patches_chain` 接口，显示已装 / 最新版本 |
| 下载限速 | 读写 Game Center `preferences.xml` 的 `download_speed_limit` |
| 桌面快捷方式 | 一键创建带图标的快捷方式 |
| 自动更新 | 通过 GitHub Releases + `electron-updater` 检查、下载、安装新版本 |
| 多语言界面 | 简体中文 / English / Русский |

## 下载与安装

### 系统要求

- Windows 10 / 11，x64
- 已通过官方 **Wargaming Game Center**（或俄服 **Lesta Game Center**）安装游戏客户端
- 官方 Game Center 已登录并勾选「记住账号」
- 系统自带 PowerShell（用于隐藏 / 显示 Game Center 窗口）

### 安装正式版

1. 到仓库的 [Releases](https://github.com/dingy6607-ops/wows-third-party-launcher/releases) 页面下载最新的 `WoWS-Launcher-Setup-<version>.exe`。
2. 双击运行安装向导，可选择是否创建桌面快捷方式。
3. 首次运行若出现 Windows SmartScreen 提示，点「更多信息 → 仍要运行」（正式版由 SignPath Foundation 签名；内测版为自签名）。

> **分享给他人时只需发送安装包 exe 这一个文件**。不要单独发送 `win-unpacked\WoWS Launcher.exe`，它依赖同目录的整包资源文件。

### 免安装版

`dist\win-unpacked\` 整个文件夹压缩后分发，运行其中的 `WoWS Launcher.exe`。

## 快速上手

### 1. 打开启动器

**不需要登录即可使用**，主页、新闻、区服切换、模组、更新检测、启动游戏等功能均可直接使用。

### 2. 启动游戏

选择区服 → 点击「启动游戏」。启动器会：

1. 在后台拉起官方 Game Center（其窗口被隐藏）；
2. 等待本地凭证服务就绪；
3. 直接运行 `bin\<最新版本>\bin64\WorldOfWarships64.exe`（俄服为对应的 Korabli 客户端）。

**前提**：Game Center 处于已登录状态。首次使用请先在「设置」页点「打开 WGC / LGC」登录一次并勾选记住账号。若登录过期，游戏会弹出官方登录窗口要求重新登录，这是官方机制，无法绕过。

### 3. （可选）登录账号查看战绩

「账号」页支持 Wargaming / Lesta OpenID 登录，仅用于查询战绩概览：

- 需要**自行**在 `developers.wargaming.net` 注册应用并填入 Application ID；本项目不内置任何官方密钥。
- 登录页由官方域名提供，回调到本机 `http://localhost:8765/callback`。
- 令牌保存在本地 `localStorage`，有效期最长约 2 周，可随时退出登录清除。

### 4. 检查更新

「设置 → 软件更新 → 检查更新」，有新版时可下载并在重启后安装。

## 隐私与数据

- **无遥测、无使用数据上报**，不会把账号信息发送到本项目或任何第三方统计服务。
- 本地存储：语言 / 区服 / 游戏路径 / Application ID / 登录令牌，均保存在 Electron 的本地用户数据目录。
- 网络请求仅发往：
  - 官方 API：`api.worldoftanks.*`、`api.worldofwarships.*`（登录、战绩）
  - 官方内容接口：`chubapi.wgprod.net`（WG 新闻）、`lstuscs-ru.lesta.ru`（Lesta 新闻）
  - `game_info.xml` 中声明的官方更新地址（`patches_chain` 版本检测）
  - `aslain.com`（可选下载整合包）、`worldofwarships.*` / `korabli.su`（点击新闻跳转原文）
  - GitHub Releases（检查 / 下载程序更新）
- 本软件会**读写** Game Center 的 `preferences.xml`（仅 `download_speed_limit` 字段），并运行本地 PowerShell 脚本隐藏 / 显示 Game Center 窗口。详见 [免责条款](DISCLAIMER.md)。

## 开发

```bash
npm ci
npm start
```

技术栈：Electron 33 + 原生 JavaScript（无前端框架）、`electron-builder`（NSIS）、`electron-updater`。

## 打包（本地内测）

```bash
npm run dist        # 生成 NSIS 安装包
npm run dist:dir    # 仅生成免安装目录
```

本地构建使用 `build/wows-launcher.pfx` 的**自签名证书**，仅供内测，该证书已被 `.gitignore` 排除、不会提交到仓库。产物输出到 `dist/`（同样不提交）。

## 正式发布（维护者）

正式版由 [`.github/workflows/release.yml`](.github/workflows/release.yml) 在推送 `v*` 标签时自动完成：

```
干净 CI 构建未签名包 → SignPath Foundation 签名 → 重建 latest.yml / blockmap → 创建 GitHub Release
```

1. 修改 `package.json` 的 `version` 并提交；
2. `git tag v<version> && git push origin v<version>`（tag 必须与 version 一致）；
3. 流水线自动发布 exe、`latest.yml`、`*.exe.blockmap` 三个文件。

签名策略见 [docs/SIGNING.md](docs/SIGNING.md)，所需仓库 secrets 见该 workflow 顶部注释。

## 目录结构

```
├── main.js                     # 主进程（窗口、登录、启动游戏、更新检测、签名相关 IPC）
├── preload.js                  # 安全的 API 桥接层
├── renderer/                   # 界面（index.html / renderer.js / styles.css）
├── scripts/                    # Game Center 窗口控制脚本
├── build/                      # 图标与本地自签名证书（证书不提交）
├── docs/SIGNING.md             # 代码签名策略
├── .github/workflows/          # 正式发布流水线
├── TERMS.md                    # 用户协议
├── DISCLAIMER.md               # 免责条款
└── LICENSE                     # MIT 许可证
```

## 相关文档

- [用户协议](TERMS.md)
- [免责条款](DISCLAIMER.md)
- [代码签名策略](docs/SIGNING.md)
- [MIT 许可证](LICENSE)

## 许可

MIT License · Copyright (c) 2026 dingy6607-ops

游戏名称、商标、 artwork 与相关数据归 Wargaming.net / Lesta Studio 及其各自权利人所有。本仓库仅包含启动器自身代码，不含任何游戏资源文件。
