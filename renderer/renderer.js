// ---------- 国际化 (i18n) ----------
const I18N = {
  app_tag: { zh: '第三方增强启动器', en: 'Third-party Enhanced Launcher', ru: 'Сторонний улучшенный лаунчер' },
  minimize: { zh: '最小化', en: 'Minimize', ru: 'Свернуть' },
  maximize: { zh: '最大化', en: 'Maximize', ru: 'Развернуть' },
  close: { zh: '关闭', en: 'Close', ru: 'Закрыть' },
  nav_home: { zh: '主页', en: 'Home', ru: 'Главная' },
  nav_games: { zh: '游戏', en: 'Games', ru: 'Игры' },
  nav_mods: { zh: '模组', en: 'Mods', ru: 'Моды' },
  nav_account: { zh: '账号', en: 'Account', ru: 'Аккаунт' },
  nav_settings: { zh: '设置', en: 'Settings', ru: 'Настройки' },
  welcome_back: { zh: '欢迎回来，舰长', en: 'Welcome back, Captain', ru: 'С возвращением, капитан' },
  welcome_sub_out: { zh: '尚未登录，点击「账号」使用 Wargaming 账号登录', en: 'Not signed in. Go to "Account" to sign in with Wargaming', ru: 'Вы не вошли. Перейдите в «Аккаунт» для входа через Wargaming' },
  game_desc: { zh: '战舰世界 ·', en: 'World of Warships ·', ru: 'Мир кораблей ·' },
  launch_game: { zh: '启动游戏', en: 'Launch Game', ru: 'Запустить игру' },
  game_version: { zh: '游戏版本', en: 'Game Version', ru: 'Версия игры' },
  check_update: { zh: '检查更新', en: 'Check Update', ru: 'Проверить обновления' },
  not_detected: { zh: '未检测', en: 'Not Detected', ru: 'Не обнаружено' },
  update_now: { zh: '立即更新', en: 'Update Now', ru: 'Обновить сейчас' },
  server_status: { zh: '服务器状态', en: 'Server Status', ru: 'Статус сервера' },
  online: { zh: '在线', en: 'Online', ru: 'Онлайн' },
  current_region: { zh: '当前游戏区服', en: 'Current Region', ru: 'Текущий регион' },
  installed_mods: { zh: '已安装模组', en: 'Installed Mods', ru: 'Установленные моды' },
  manage_mods: { zh: '前往「模组」页管理', en: 'Manage on the "Mods" page', ru: 'Управление на странице «Моды»' },
  announcements: { zh: '更新公告', en: 'Announcements', ru: 'Объявления' },
  no_more_notices: { zh: '暂无更多公告', en: 'No more announcements', ru: 'Больше нет объявлений' },
  game_clients: { zh: '游戏客户端', en: 'Game Clients', ru: 'Игровые клиенты' },
  rescan: { zh: '重新扫描', en: 'Rescan', ru: 'Пересканировать' },
  scanning: { zh: '扫描中…', en: 'Scanning…', ru: 'Сканирование…' },
  games_hint: { zh: '自动识别本机的战舰世界客户端：国际服 (WG)、俄服 (Lesta)、国服 (360)。', en: 'Auto-detect World of Warships clients on this PC: global (WG), RU (Lesta), CN (360).', ru: 'Автоопределение клиентов «Мира кораблей»: глобальный (WG), RU (Lesta), CN (360).' },
  mod_management: { zh: '模组管理', en: 'Mod Management', ru: 'Управление модами' },
  detecting: { zh: '检测中…', en: 'Detecting…', ru: 'Обнаружение…' },
  refresh: { zh: '刷新', en: 'Refresh', ru: 'Обновить' },
  download_installer: { zh: '下载安装程序', en: 'Download Installer', ru: 'Скачать установщик' },
  loading: { zh: '加载中…', en: 'Loading…', ru: 'Загрузка…' },
  mods_hint: { zh: '提示：把模组文件夹放入 res_mods 目录即可启用；开关用于启用/禁用；标「冲突」的模组与其他模组修改了相同文件。', en: 'Tip: place mod folders into res_mods to enable them; toggles enable/disable; "Conflict" mods edit the same files as others.', ru: 'Подсказка: поместите папки модов в res_mods; переключатели включают/выключают; «Конфликт» — моды изменяют одни и те же файлы.' },
  account_title: { zh: '账号', en: 'Account', ru: 'Аккаунт' },
  logout: { zh: '退出登录', en: 'Log Out', ru: 'Выйти' },
  stats_overview: { zh: '战绩概览', en: 'Stats Overview', ru: 'Обзор статистики' },
  battles: { zh: '场次', en: 'Battles', ru: 'Бои' },
  win_rate: { zh: '胜率', en: 'Win Rate', ru: 'Процент побед' },
  frags: { zh: '击沉', en: 'Frags', ru: 'Уничтожено' },
  total_damage: { zh: '总伤害', en: 'Total Damage', ru: 'Общий урон' },
  max_xp: { zh: '最高经验', en: 'Max XP', ru: 'Макс. опыт' },
  survive_rate: { zh: '存活率', en: 'Survival Rate', ru: 'Выживаемость' },
  wg_login_title: { zh: '使用 Wargaming 账号登录', en: 'Sign in with Wargaming', ru: 'Вход через Wargaming' },
  server: { zh: '服务器', en: 'Server', ru: 'Сервер' },
  login: { zh: '登录', en: 'Log In', ru: 'Войти' },
  lesta_login_title: { zh: '使用 Lesta 账号登录（俄服）', en: 'Sign in with Lesta (RU)', ru: 'Вход через Lesta (RU)' },
  lesta_login_btn: { zh: '通过 Lesta 登录', en: 'Sign in with Lesta', ru: 'Войти через Lesta' },
  account_note: { zh: '登录基于 Wargaming / Lesta 官方 OpenID，令牌由官方签发，仅存储在本机，用于访问战绩与账号信息。', en: 'Sign-in uses official Wargaming / Lesta OpenID. Tokens are issued by official servers and stored locally only for stats and account info.', ru: 'Вход использует официальный OpenID Wargaming / Lesta. Токены выдаются официальными серверами и хранятся локально только для статистики.' },
  settings_title: { zh: '设置', en: 'Settings', ru: 'Настройки' },
  launch_options: { zh: '启动选项', en: 'Launch Options', ru: 'Параметры запуска' },
  minimize_after_launch: { zh: '启动游戏后最小化启动器', en: 'Minimize launcher after launching game', ru: 'Свернуть лаунчер после запуска игры' },
  minimize_after_launch_desc: { zh: '进入游戏后自动收起启动器窗口', en: 'Automatically minimize the launcher window in game', ru: 'Автоматически сворачивать окно лаунчера в игре' },
  auto_login: { zh: '启动时自动登录', en: 'Auto sign-in on launch', ru: 'Автовход при запуске' },
  auto_login_desc: { zh: '打开启动器时自动尝试登录上次账号', en: 'Try to sign in with the last account on launch', ru: 'Пытаться войти в последний аккаунт при запуске' },
  game_client: { zh: '游戏客户端', en: 'Game Client', ru: 'Игровой клиент' },
  client_path: { zh: '客户端路径', en: 'Client Path', ru: 'Путь клиента' },
  re_detect: { zh: '重新检测', en: 'Re-detect', ru: 'Обнаружить заново' },
  manual_path: { zh: '手动指定安装目录', en: 'Manually specify install directory', ru: 'Указать каталог установки вручную' },
  save_path: { zh: '保存路径', en: 'Save Path', ru: 'Сохранить путь' },
  path_hint: { zh: '启动器会自动扫描常见安装位置；若未检测到，请手动填写客户端根目录（包含 WorldOfWarships.exe 的文件夹）。', en: 'The launcher auto-scans common install locations. If not detected, enter the client root (the folder containing WorldOfWarships.exe).', ru: 'Лаунчер автоматически сканирует стандартные места установки. Если не найдено, укажите корень клиента (папку с WorldOfWarships.exe).' },
  wgc_bg: { zh: 'WGC 后台运行', en: 'WGC runs in background', ru: 'WGC работает в фоне' },
  wgc_bg_desc: { zh: '启动游戏时 WGC 会完全隐藏；若登录过期，点「打开 WGC」重新登录', en: 'WGC is fully hidden when launching the game; if sign-in expires, click "Open WGC" to re-sign in', ru: 'WGC полностью скрывается при запуске игры; если вход истёк, нажмите «Открыть WGC»' },
  open_wgc: { zh: '打开 WGC', en: 'Open WGC', ru: 'Открыть WGC' },
  lgc_bg: { zh: 'LGC 后台运行', en: 'LGC runs in background', ru: 'LGC работает в фоне' },
  lgc_bg_desc: { zh: '启动俄服时 LGC 会完全隐藏；若登录过期，点「打开 LGC」重新登录', en: 'LGC is fully hidden when launching the RU game; if sign-in expires, click "Open LGC" to re-sign in', ru: 'LGC полностью скрывается при запуске RU-игры; если вход истёк, нажмите «Открыть LGC»' },
  open_lgc: { zh: '打开 LGC', en: 'Open LGC', ru: 'Открыть LGC' },
  download_update: { zh: '下载与更新', en: 'Download & Update', ru: 'Загрузка и обновление' },
  speed_limit: { zh: '下载限速', en: 'Download Speed Limit', ru: 'Ограничение скорости' },
  speed_limit_desc: { zh: '限制 Game Center 的游戏下载速度', en: 'Limit Game Center download speed', ru: 'Ограничить скорость загрузки Game Center' },
  unlimited: { zh: '不限速', en: 'Unlimited', ru: 'Без ограничений' },
  pre_download: { zh: '提前下载更新', en: 'Pre-download updates', ru: 'Предварительная загрузка обновлений' },
  pre_download_desc: { zh: '允许 Game Center 提前下载即将到来的更新', en: 'Allow Game Center to pre-download upcoming updates', ru: 'Разрешить Game Center предварительно загружать обновления' },
  speed_limit_hint: { zh: '限速会写入 Game Center 的 preferences.xml；若 Game Center 正在运行，需重启后生效。', en: 'The speed limit is written to Game Center preferences.xml; restart Game Center if it is running.', ru: 'Ограничение записывается в preferences.xml Game Center; перезапустите Game Center, если он запущен.' },
  about: { zh: '关于', en: 'About', ru: 'О программе' },
  about_desc: { zh: '版本 v0.1.0 · 非官方第三方启动器', en: 'Version v0.1.0 · Unofficial third-party launcher', ru: 'Версия v0.1.0 · Неофициальный сторонний лаунчер' },
  about_note: { zh: '本项目为社区爱好作品，与 Wargaming 无任何关联。游戏本体与更新仍由官方 WGC 完成。', en: 'This is a community hobby project, not affiliated with Wargaming. Game files and updates are still handled by the official WGC.', ru: 'Это любительский проект сообщества, не связанный с Wargaming. Файлы и обновления игры по-прежнему обрабатываются официальным WGC.' },
  language: { zh: '语言', en: 'Language', ru: 'Язык' },
  region_asia: { zh: '亚服 (Asia)', en: 'Asia', ru: 'Азия' },
  region_eu: { zh: '欧服 (EU)', en: 'EU', ru: 'Европа' },
  region_na: { zh: '美服 (NA)', en: 'NA', ru: 'Америка' },
  region_ru: { zh: '俄服 (RU)', en: 'RU', ru: 'Россия' },
  region_cn: { zh: '国服 (CN)', en: 'CN', ru: 'Китай' },
  logged_in_sub: { zh: '已登录，可同步战绩与账号设置', en: 'Signed in; stats and account settings synced', ru: 'Вы вошли; статистика и настройки синхронизированы' },
  welcome_name: { zh: '欢迎回来，{name}', en: 'Welcome back, {name}', ru: 'С возвращением, {name}' },
  account_meta: { zh: '账号 ID: {id} · 令牌有效期至 {date}', en: 'Account ID: {id} · Token expires {date}', ru: 'ID аккаунта: {id} · Токен до {date}' },
  captain: { zh: '舰长', en: 'Captain', ru: 'капитан' },
  logging_in: { zh: '登录中…', en: 'Signing in…', ru: 'Вход…' },
  fill_app_id: { zh: '请先填写 Application ID', en: 'Please enter an Application ID first', ru: 'Сначала введите Application ID' },
  login_failed: { zh: '登录失败', en: 'Sign-in failed', ru: 'Ошибка входа' },
  login_error: { zh: '登录出错: {msg}', en: 'Sign-in error: {msg}', ru: 'Ошибка входа: {msg}' },
  fill_lesta_app_id: { zh: '请先填写 Lesta Application ID', en: 'Please enter a Lesta Application ID first', ru: 'Сначала введите Lesta Application ID' },
  has_new_version: { zh: '有新版本', en: 'Update Available', ru: 'Доступно обновление' },
  up_to_date: { zh: '已最新', en: 'Up to Date', ru: 'Актуально' },
  ready: { zh: '已就绪', en: 'Ready', ru: 'Готово' },
  detected: { zh: '已检测', en: 'Detected', ru: 'Обнаружено' },
  live: { zh: '实时', en: 'Live', ru: 'В реальном времени' },
  cached: { zh: '缓存', en: 'Cached', ru: 'Кэш' },
  version_installed_latest: { zh: '已装 {i} · 最新 {a}', en: 'Installed {i} · Latest {a}', ru: 'Установлено {i} · Последняя {a}' },
  version_label: { zh: '版本 {v}', en: 'Version {v}', ru: 'Версия {v}' },
  client_not_found: { zh: '未找到客户端，请到设置指定路径', en: 'Client not found. Set the path in Settings.', ru: 'Клиент не найден. Укажите путь в настройках.' },
  updating: { zh: '更新中', en: 'Updating', ru: 'Обновление' },
  downloading_speed: { zh: '正在下载更新 · {speed}/s', en: 'Downloading update · {speed}/s', ru: 'Загрузка обновления · {speed}/с' },
  launching: { zh: '启动中…', en: 'Launching…', ru: 'Запуск…' },
  launch_error: { zh: '启动出错: {msg}', en: 'Launch error: {msg}', ru: 'Ошибка запуска: {msg}' },
  checking_update: { zh: '正在检查更新…', en: 'Checking for updates…', ru: 'Проверка обновлений…' },
  path_saved: { zh: '路径已保存并重新检测', en: 'Path saved and re-detected', ru: 'Путь сохранён и повторно обнаружен' },
  path_cleared: { zh: '已清除手动路径', en: 'Manual path cleared', ru: 'Ручной путь очищен' },
  mod_dir: { zh: 'mod 目录: {dir}', en: 'mod dir: {dir}', ru: 'каталог mod: {dir}' },
  mod_dir_not_found: { zh: '未检测到 mod 目录', en: 'mod directory not found', ru: 'каталог mod не найден' },
  no_mods: { zh: '暂无模组。把模组文件夹放入 res_mods 目录即可。', en: 'No mods yet. Place mod folders into the res_mods directory.', ru: 'Модов нет. Поместите папки модов в каталог res_mods.' },
  conflict: { zh: '冲突', en: 'Conflict', ru: 'Конфликт' },
  op_failed: { zh: '操作失败', en: 'Operation failed', ru: 'Ошибка операции' },
  latest_version: { zh: '最新版本 v{v}', en: 'Latest version v{v}', ru: 'Последняя версия v{v}' },
  got_link: { zh: '已获取下载链接', en: 'Download link ready', ru: 'Ссылка на загрузку готова' },
  fetch_failed: { zh: '获取失败', en: 'Failed to fetch', ru: 'Не удалось получить' },
  get_link_first: { zh: '请先获取下载链接', en: 'Please get the download link first', ru: 'Сначала получите ссылку на загрузку' },
  downloading: { zh: '下载中…', en: 'Downloading…', ru: 'Загрузка…' },
  download_done_installing: { zh: '下载完成，正在启动安装…', en: 'Downloaded. Starting installer…', ru: 'Загружено. Запуск установщика…' },
  download_failed: { zh: '下载失败', en: 'Download failed', ru: 'Ошибка загрузки' },
  download_error: { zh: '下载出错: {msg}', en: 'Download error: {msg}', ru: 'Ошибка загрузки: {msg}' },
  region_label: { zh: '区服: {name}', en: 'Region: {name}', ru: 'Регион: {name}' },
  region_follows_account: { zh: '区服: {name}（跟随账号）', en: 'Region: {name} (follows account)', ru: 'Регион: {name} (по аккаунту)' },
  unknown: { zh: '未知', en: 'Unknown', ru: 'Неизвестно' },
  launch: { zh: '启动', en: 'Launch', ru: 'Запустить' },
  cn_not_supported: { zh: '暂不支持国服', en: 'CN not supported yet', ru: 'CN пока не поддерживается' },
  region_mismatch: { zh: '区服不匹配', en: 'Region mismatch', ru: 'Несоответствие региона' },
  no_clients: { zh: '未检测到客户端，请到「设置 → 游戏客户端」手动指定。', en: 'No clients detected. Specify manually in Settings → Game Client.', ru: 'Клиенты не обнаружены. Укажите вручную в «Настройки → Игровой клиент».' },
  set_failed: { zh: '设置失败', en: 'Set failed', ru: 'Ошибка установки' },
  speed_current: { zh: '当前限速：{speed}（写入 Game Center 配置，重启后生效）', en: 'Current limit: {speed} (written to Game Center config, applies after restart)', ru: 'Текущее ограничение: {speed} (записано в конфиг Game Center, применяется после перезапуска)' },
  wg_login_hint: { zh: '需先在 Wargaming 开发者平台（developers.wargaming.net）注册应用获取 Application ID，并在应用设置中把 Redirect URI 填为 ', en: 'Register an app on the Wargaming developer portal (developers.wargaming.net) to get an Application ID, and set the Redirect URI to ', ru: 'Зарегистрируйте приложение на портале разработчиков Wargaming (developers.wargaming.net), чтобы получить Application ID, и укажите Redirect URI ' },
  lesta_login_hint: { zh: '俄服（Lesta）账号与 Wargaming 账号相互独立。请在 developers.lesta.ru 注册应用获取 Application ID，并将 Redirect URI 填为 ', en: 'Lesta (RU) accounts are separate from Wargaming. Register an app at developers.lesta.ru and set the Redirect URI to ', ru: 'Аккаунты Lesta (RU) не связаны с Wargaming. Зарегистрируйте приложение на developers.lesta.ru и укажите Redirect URI ' },
  switch_region: { zh: '切换游戏区服', en: 'Switch game region', ru: 'Сменить игровой регион' },
  notice_demo: { zh: '项目骨架已搭建完成，更多功能开发中…', en: 'Project skeleton is ready, more features coming soon…', ru: 'Каркас проекта готов, новые функции в разработке…' },
  mods_count: { zh: '0 个', en: '0 mods', ru: '0 модов' },
  app_id_placeholder: { zh: '从 developers.wargaming.net 获取', en: 'Get from developers.wargaming.net', ru: 'Получите на developers.wargaming.net' },
  lesta_app_id_placeholder: { zh: '从 developers.lesta.ru 获取', en: 'Get from developers.lesta.ru', ru: 'Получите на developers.lesta.ru' },
  path_placeholder: { zh: '例如 C:\\Games\\World_of_Warships', en: 'e.g. C:\\Games\\World_of_Warships', ru: 'Например, C:\\Games\\World_of_Warships' },
  language_desc: { zh: '选择界面显示语言，立即生效', en: 'Choose the interface language (applies immediately)', ru: 'Выберите язык интерфейса (применяется сразу)' },
  nav_news: { zh: '新闻', en: 'News', ru: 'Новости' },
  news_title: { zh: '官方新闻', en: 'Official News', ru: 'Официальные новости' },
  news_no_items: { zh: '暂无新闻', en: 'No news available', ru: 'Нет новостей' },
  news_failed: { zh: '新闻加载失败，请稍后重试', en: 'Failed to load news. Please retry.', ru: 'Не удалось загрузить новости. Повторите позже.' },
  news_open: { zh: '打开原文', en: 'Open article', ru: 'Открыть статью' },
  desktop_shortcut: { zh: '桌面快捷方式', en: 'Desktop Shortcut', ru: 'Ярлык на рабочем столе' },
  shortcut_name: { zh: '创建桌面快捷方式', en: 'Create desktop shortcut', ru: 'Создать ярлык на рабочем столе' },
  shortcut_desc: { zh: '在桌面生成带图标的启动快捷方式，双击即可启动', en: 'Create a shortcut with icon on desktop to launch directly', ru: 'Создать ярлык с иконкой на рабочем столе для прямого запуска' },
  create_shortcut: { zh: '创建快捷方式', en: 'Create shortcut', ru: 'Создать ярлык' },
  shortcut_hint: { zh: '快捷方式指向当前运行的应用；移动项目目录后需重新创建。', en: 'The shortcut points to the current app; recreate it if you move the project folder.', ru: 'Ярлык указывает на текущее приложение; пересоздайте его при переносе папки проекта.' },
  shortcut_success: { zh: '快捷方式已创建到桌面', en: 'Shortcut created on desktop', ru: 'Ярлык создан на рабочем столе' },
  shortcut_failed: { zh: '创建快捷方式失败', en: 'Failed to create shortcut', ru: 'Не удалось создать ярлык' },
  software_update: { zh: '软件更新', en: 'Software Update', ru: 'Обновление ПО' },
  current_version: { zh: '当前版本', en: 'Current Version', ru: 'Текущая версия' },
  update_idle: { zh: '尚未检查更新', en: 'Not checked yet', ru: 'Обновление не проверено' },
  download_update_btn: { zh: '下载更新', en: 'Download Update', ru: 'Скачать обновление' },
  install_update: { zh: '安装并重启', en: 'Install & Restart', ru: 'Установить и перезапустить' },
  update_checking: { zh: '正在检查更新…', en: 'Checking for updates…', ru: 'Проверка обновлений…' },
  update_available: { zh: '发现新版本', en: 'New version available', ru: 'Доступна новая версия' },
  update_latest: { zh: '已是最新版本', en: 'You are up to date', ru: 'У вас последняя версия' },
  update_downloading: { zh: '正在下载更新', en: 'Downloading update', ru: 'Загрузка обновления' },
  update_downloaded: { zh: '更新已下载，可安装', en: 'Update downloaded, ready to install', ru: 'Обновление загружено, готово к установке' },
  update_error: { zh: '更新检查失败', en: 'Update check failed', ru: 'Ошибка проверки обновлений' },
  update_dev_mode: { zh: '开发模式下不支持自动更新', en: 'Auto update is unavailable in dev mode', ru: 'Автообновление недоступно в режиме разработки' }
};

function getLang() {
  const config = loadConfig();
  return (config.lang === 'en' || config.lang === 'ru') ? config.lang : 'zh';
}

function t(key, vars) {
  let s = (I18N[key] && I18N[key][getLang()]) || (I18N[key] && I18N[key].zh) || key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    });
  }
  return s;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
  const lang = getLang();
  document.documentElement.lang = lang === 'ru' ? 'ru' : (lang === 'en' ? 'en' : 'zh-CN');
}

function setLang(lang) {
  const config = loadConfig();
  config.lang = lang;
  saveConfig(config);
  applyI18n();
  renderAccount();
  detectAndRenderGame();
  loadGames();
  loadMods();
  loadAslainInfo();
  loadSpeedLimit();
  loadNews();
  applyRegion(getRegion());
  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;
}

// ---------- 页面导航切换 ----------
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const target = item.dataset.page;

    navItems.forEach((n) => n.classList.remove('active'));
    item.classList.add('active');

    pages.forEach((p) => p.classList.remove('active'));
    document.getElementById(`page-${target}`).classList.add('active');
  });
});

// ---------- 自定义标题栏按钮 ----------
document.getElementById('btn-min')?.addEventListener('click', () => {
  window.launcherAPI.minimize();
});

document.getElementById('btn-max')?.addEventListener('click', () => {
  window.launcherAPI.maximize();
});

document.getElementById('btn-close')?.addEventListener('click', () => {
  window.launcherAPI.close();
});

// ---------- 登录状态管理 ----------
const AUTH_KEY = 'wows_launcher_auth';
const CONFIG_KEY = 'wows_launcher_config';

function saveAuth(data) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

function loadAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
  } catch {
    return null;
  }
}

function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

function saveConfig(cfg) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
}

function loadConfig() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY)) || {};
  } catch {
    return {};
  }
}

function updateHomeGreeting(nickname) {
  const title = document.querySelector('#page-home .welcome-title');
  const sub = document.querySelector('#page-home .welcome-sub');
  if (!title || !sub) return;
  if (nickname) {
    title.textContent = t('welcome_name', { name: nickname });
    sub.textContent = t('logged_in_sub');
  } else {
    title.textContent = t('welcome_back');
    sub.textContent = t('welcome_sub_out');
  }
}

function renderAccount() {
  const auth = loadAuth();
  const config = loadConfig();
  const profile = document.getElementById('account-profile');
  const form = document.getElementById('account-login-form');
  const lestaForm = document.getElementById('lesta-login-form');

  // 恢复上次填写的配置
  document.getElementById('auth-app-id').value = config.applicationId || '';
  document.getElementById('auth-region').value = config.region || 'asia';
  document.getElementById('lesta-app-id').value = config.lestaApplicationId || '';

  const statsPanel = document.getElementById('account-stats');
  if (auth && auth.status === 'ok') {
    profile.hidden = false;
    form.hidden = true;
    if (lestaForm) lestaForm.hidden = true;
    document.getElementById('account-nickname').textContent = auth.nickname || t('captain');
    document.getElementById('account-meta').textContent =
      t('account_meta', {
        id: auth.account_id || '--',
        date: new Date(auth.expires_at * 1000).toLocaleDateString(getLang() === 'ru' ? 'ru-RU' : (getLang() === 'en' ? 'en-US' : 'zh-CN'))
      });
    updateHomeGreeting(auth.nickname);
    loadAccountStats();
  } else {
    profile.hidden = true;
    form.hidden = false;
    if (lestaForm) lestaForm.hidden = false;
    if (statsPanel) statsPanel.hidden = true;
    updateHomeGreeting(null);
  }
}

// ---------- 战绩查询 ----------
function formatNumber(n) {
  if (n == null) return '--';
  const lang = getLang();
  const locale = lang === 'ru' ? 'ru-RU' : (lang === 'en' ? 'en-US' : 'zh-CN');
  return Number(n).toLocaleString(locale);
}

function formatDamage(n) {
  if (n == null) return '--';
  const lang = getLang();
  if (lang === 'ru') {
    if (n >= 1000000000) return (n / 1000000000).toFixed(2) + ' млрд';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + ' млн';
  } else if (lang === 'en') {
    if (n >= 1000000000) return (n / 1000000000).toFixed(2) + 'B';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  } else {
    if (n >= 100000000) return (n / 100000000).toFixed(2) + ' 亿';
    if (n >= 10000) return (n / 10000).toFixed(1) + ' 万';
  }
  return formatNumber(n);
}

function renderStats(data) {
  const stats = data.statistics || {};
  const battles = stats.battles || 0;
  const wins = stats.wins || 0;
  const winRate = battles > 0 ? ((wins / battles) * 100).toFixed(1) + '%' : '--';
  const surviveRate = battles > 0 ? (((stats.survived_battles || 0) / battles) * 100).toFixed(1) + '%' : '--';

  document.getElementById('stat-battles').textContent = formatNumber(battles);
  document.getElementById('stat-wins').textContent = winRate;
  document.getElementById('stat-frags').textContent = formatNumber(stats.frags);
  document.getElementById('stat-damage').textContent = formatDamage(stats.damage_dealt);
  document.getElementById('stat-maxxp').textContent = formatNumber(stats.max_xp);
  document.getElementById('stat-survive').textContent = surviveRate;
}

async function loadAccountStats() {
  const auth = loadAuth();
  const config = loadConfig();
  const panel = document.getElementById('account-stats');
  if (!auth || auth.status !== 'ok') {
    if (panel) panel.hidden = true;
    return;
  }

  panel.hidden = false;
  try {
    const region = config.region || 'asia';
    const applicationId = region === 'ru'
      ? (config.lestaApplicationId || config.applicationId)
      : config.applicationId;
    const result = await window.launcherAPI.getAccountStats({
      applicationId,
      accountId: auth.account_id,
      accessToken: auth.access_token,
      region
    });
    if (result && result.status === 'ok' && result.data) {
      const data = result.data[auth.account_id];
      if (data) {
        renderStats(data);
        return;
      }
    }
    ['stat-battles', 'stat-wins', 'stat-frags', 'stat-damage', 'stat-maxxp', 'stat-survive'].forEach((id) => {
      document.getElementById(id).textContent = '--';
    });
  } catch {
    // 静默处理查询失败
  }
}

document.getElementById('btn-login')?.addEventListener('click', async () => {
  const applicationId = document.getElementById('auth-app-id').value.trim();
  const region = document.getElementById('auth-region').value;

  if (!applicationId) {
    alert(t('fill_app_id'));
    return;
  }

  const btn = document.getElementById('btn-login');
  btn.disabled = true;
  btn.textContent = t('logging_in');

  try {
    const result = await window.launcherAPI.login({ applicationId, region });
    if (result && result.status === 'ok') {
      saveAuth(result);
      const config = loadConfig();
      config.applicationId = applicationId;
      config.region = region;
      saveConfig(config);
      renderAccount();
    } else if (result && result.status === 'cancelled') {
      // 用户主动关闭，静默处理
    } else {
      alert(result?.error || t('login_failed'));
    }
  } catch (err) {
    alert(t('login_error', { msg: err.message }));
  } finally {
    btn.disabled = false;
    btn.textContent = t('login');
  }
});

document.getElementById('btn-logout')?.addEventListener('click', () => {
  clearAuth();
  renderAccount();
});

document.getElementById('btn-lesta-login')?.addEventListener('click', async () => {
  const applicationId = document.getElementById('lesta-app-id').value.trim();

  if (!applicationId) {
    alert(t('fill_lesta_app_id'));
    return;
  }

  const btn = document.getElementById('btn-lesta-login');
  btn.disabled = true;
  btn.textContent = t('logging_in');

  try {
    const result = await window.launcherAPI.login({ applicationId, region: 'ru' });
    if (result && result.status === 'ok') {
      saveAuth(result);
      const config = loadConfig();
      config.region = 'ru';
      config.lestaApplicationId = applicationId;
      saveConfig(config);
      applyRegion('ru');
      renderAccount();
    } else if (result && result.status === 'cancelled') {
      // 用户主动关闭，静默处理
    } else {
      alert(result?.error || t('login_failed'));
    }
  } catch (err) {
    alert(t('login_error', { msg: err.message }));
  } finally {
    btn.disabled = false;
    btn.textContent = t('lesta_login_btn');
  }
});

// 页面加载时恢复登录状态
renderAccount();

// ---------- 游戏客户端检测与启动 ----------
const GAME_PATH_KEY = 'wows_launcher_game_path';

function loadGamePath() {
  return localStorage.getItem(GAME_PATH_KEY) || '';
}

function saveGamePath(p) {
  if (p) localStorage.setItem(GAME_PATH_KEY, p);
  else localStorage.removeItem(GAME_PATH_KEY);
}

function shortVersion(v) {
  return String(v || '').split('.').slice(0, 3).join('.');
}

let currentClientType = null;

function renderGameStatus(result, updateInfo) {
  const badge = document.getElementById('game-status-badge');
  const value = document.getElementById('game-status-value');
  const hint = document.getElementById('game-status-hint');
  const launchText = document.getElementById('btn-launch-text');
  const pathValue = document.getElementById('game-path-value');
  const btnUpdate = document.getElementById('btn-update');

  if (result && result.found) {
    currentClientType = result.type || null;
    const version = updateInfo && updateInfo.ok ? updateInfo.installed : null;
    const hasUpdate = updateInfo && updateInfo.ok && updateInfo.hasUpdate;

    if (hasUpdate) {
      badge.textContent = t('has_new_version');
      badge.className = 'badge badge-info';
    } else if (version) {
      badge.textContent = t('up_to_date');
      badge.className = 'badge badge-ok';
    } else {
      badge.textContent = t('ready');
      badge.className = 'badge badge-ok';
    }

    value.textContent = version ? shortVersion(version) : t('detected');
    const source = (updateInfo && updateInfo.liveCheck) ? t('live') : t('cached');
    hint.textContent = hasUpdate
      ? t('version_installed_latest', { i: shortVersion(version), a: shortVersion(updateInfo.available) }) + `（${source}）`
      : (version ? t('version_label', { v: version }) + `（${source}）` : (result.root || ''));
    hint.title = result.exe || '';
    if (launchText) launchText.textContent = t('launch_game');
    if (pathValue) pathValue.textContent = result.root || result.exe;
    if (btnUpdate) btnUpdate.hidden = !hasUpdate;
  } else {
    currentClientType = null;
    badge.textContent = t('not_detected');
    badge.className = 'badge badge-info';
    value.textContent = '--';
    hint.textContent = t('client_not_found');
    if (pathValue) pathValue.textContent = t('not_detected');
    if (btnUpdate) btnUpdate.hidden = true;
  }
}

// ---------- 下载进度监控 ----------
let progressTimer = null;
let lastBytes = 0;
let lastTime = 0;

function formatBytes(n) {
  if (n >= 1073741824) return (n / 1073741824).toFixed(2) + ' GB';
  if (n >= 1048576) return (n / 1048576).toFixed(1) + ' MB';
  if (n >= 1024) return (n / 1024).toFixed(0) + ' KB';
  return n + ' B';
}

function stopProgressMonitor() {
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
  lastBytes = 0;
  lastTime = 0;
}

async function pollUpdateProgress(root) {
  let result;
  try {
    result = await window.launcherAPI.getUpdateProgress({ root });
  } catch { return; }
  if (!result || !result.ok) return;

  const badge = document.getElementById('game-status-badge');
  const hint = document.getElementById('game-status-hint');
  const value = document.getElementById('game-status-value');

  if (result.active) {
    const now = Date.now();
    let speed = 0;
    if (lastTime && now > lastTime) {
      speed = (result.bytes - lastBytes) / ((now - lastTime) / 1000);
    }
    lastBytes = result.bytes;
    lastTime = now;

    if (badge) { badge.textContent = t('updating'); badge.className = 'badge badge-info'; }
    if (value) value.textContent = formatBytes(result.bytes);
    if (hint) hint.textContent = t('downloading_speed', { speed: formatBytes(Math.max(0, speed)) });
  } else if (lastTime) {
    // 之前有下载活动，现在结束（可能已完成），重新检测
    stopProgressMonitor();
    detectAndRenderGame();
  }
}

function startProgressMonitor(root) {
  stopProgressMonitor();
  progressTimer = setInterval(() => pollUpdateProgress(root), 1500);
}

async function detectAndRenderGame() {
  const result = await window.launcherAPI.detectGame({ customPath: loadGamePath() });
  let updateInfo = null;
  if (result && result.found) {
    try {
      updateInfo = await window.launcherAPI.getUpdateInfo({ root: result.root });
    } catch {}
  }
  renderGameStatus(result, updateInfo);

  // 有更新时启动下载进度监控，否则停止
  if (result && result.found && updateInfo && updateInfo.ok && updateInfo.hasUpdate) {
    startProgressMonitor(result.root);
  } else {
    stopProgressMonitor();
  }

  return result;
}

document.getElementById('btn-launch')?.addEventListener('click', async () => {
  const btn = document.getElementById('btn-launch');
  const launchText = document.getElementById('btn-launch-text');
  btn.disabled = true;
  launchText.textContent = t('launching');
  try {
    const result = await window.launcherAPI.launchGame({ region: getRegion() });
    if (!result.ok) {
      alert(result.error);
    }
  } catch (err) {
    alert(t('launch_error', { msg: err.message }));
  } finally {
    btn.disabled = false;
    launchText.textContent = t('launch_game');
  }
});

document.getElementById('btn-detect-game')?.addEventListener('click', () => {
  detectAndRenderGame();
});

document.getElementById('btn-check-update')?.addEventListener('click', async () => {
  const btn = document.getElementById('btn-check-update');
  const hint = document.getElementById('game-status-hint');
  if (btn) btn.disabled = true;
  if (hint) hint.textContent = t('checking_update');
  await detectAndRenderGame();
  if (btn) btn.disabled = false;
});

document.getElementById('btn-update')?.addEventListener('click', async () => {
  const api = currentClientType === 'lesta' ? window.launcherAPI.openLgc : window.launcherAPI.openWgc;
  const result = await api();
  if (result && !result.ok) {
    alert(result.error);
  }
});

document.getElementById('btn-save-path')?.addEventListener('click', async () => {
  const input = document.getElementById('game-path-input');
  const p = input.value.trim();
  saveGamePath(p);
  await detectAndRenderGame();
  alert(p ? t('path_saved') : t('path_cleared'));
});

document.getElementById('btn-open-wgc')?.addEventListener('click', async () => {
  const result = await window.launcherAPI.openWgc();
  if (result && !result.ok) {
    alert(result.error);
  }
});

document.getElementById('btn-open-lgc')?.addEventListener('click', async () => {
  const result = await window.launcherAPI.openLgc();
  if (result && !result.ok) {
    alert(result.error);
  }
});

// 初始化：恢复路径输入框并检测客户端
document.getElementById('game-path-input').value = loadGamePath();
detectAndRenderGame();

// ---------- 模组管理 ----------
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

async function loadMods() {
  const pathEl = document.getElementById('mods-path');
  const result = await window.launcherAPI.listMods({ root: loadGamePath() });
  if (result && result.ok) {
    pathEl.textContent = t('mod_dir', { dir: result.resModsDir });
    renderMods(result.mods, result.conflicts);
  } else {
    pathEl.textContent = result?.error || t('mod_dir_not_found');
    document.getElementById('mods-list').innerHTML = '';
  }
}

function renderMods(mods, conflicts) {
  const list = document.getElementById('mods-list');
  const conflictMods = new Set();
  (conflicts || []).forEach((c) => c.mods.forEach((m) => conflictMods.add(m)));

  if (!mods || !mods.length) {
    list.innerHTML = `<div class="mods-empty">${t('no_mods')}</div>`;
    return;
  }

  list.innerHTML = '';
  for (const mod of mods) {
    const hasConflict = conflictMods.has(mod.name);
    const item = document.createElement('div');
    item.className = 'mod-item';
    item.innerHTML =
      '<div class="mod-info">' +
      `<span class="mod-name">${escapeHtml(mod.name)}</span>` +
      (hasConflict ? `<span class="mod-conflict-badge">${t('conflict')}</span>` : '') +
      '</div>' +
      '<label class="switch">' +
      `<input type="checkbox" ${mod.enabled ? 'checked' : ''} data-mod="${escapeHtml(mod.name)}" />` +
      '<span class="slider"></span>' +
      '</label>';
    list.appendChild(item);
  }

  list.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener('change', async () => {
      const name = cb.dataset.mod;
      const result = await window.launcherAPI.toggleMod({ name, enabled: cb.checked, root: loadGamePath() });
      if (result && result.ok) {
        renderMods(result.mods, result.conflicts);
      } else {
        alert(result?.error || t('op_failed'));
        cb.checked = !cb.checked;
      }
    });
  });
}

document.getElementById('btn-refresh-mods')?.addEventListener('click', () => loadMods());

document.querySelectorAll('.nav-item[data-page="mods"]').forEach((item) => {
  item.addEventListener('click', () => loadMods());
});

loadMods();

// ---------- Aslain 整合包 ----------
async function loadAslainInfo() {
  const verEl = document.getElementById('aslain-version');
  const result = await window.launcherAPI.aslainInfo();
  if (result && result.ok) {
    verEl.textContent = result.version ? t('latest_version', { v: result.version }) : t('got_link');
    window._aslainInstaller = result.installer;
  } else {
    verEl.textContent = t('fetch_failed');
  }
}

document.getElementById('btn-download-aslain')?.addEventListener('click', async () => {
  const url = window._aslainInstaller;
  if (!url) {
    alert(t('get_link_first'));
    return;
  }
  const btn = document.getElementById('btn-download-aslain');
  btn.disabled = true;
  btn.textContent = t('downloading');
  try {
    const result = await window.launcherAPI.downloadAslain({ url });
    if (result && result.ok) {
      btn.textContent = t('download_done_installing');
      await window.launcherAPI.runInstaller({ dest: result.dest });
    } else {
      alert(result?.error || t('download_failed'));
    }
  } catch (err) {
    alert(t('download_error', { msg: err.message }));
  } finally {
    btn.disabled = false;
    btn.textContent = t('download_installer');
  }
});

loadAslainInfo();

// ---------- 游戏客户端列表 ----------
function regionName(key) {
  return t('region_' + key) || key || t('unknown');
}

async function loadGames() {
  const list = document.getElementById('games-list');
  const result = await window.launcherAPI.listGames();
  const currentRegion = getRegion();
  if (result && result.ok && result.clients && result.clients.length) {
    list.innerHTML = '';
    for (const c of result.clients) {
      const item = document.createElement('div');
      item.className = 'game-item';

      // WG 单一客户端区服跟随账号，Lesta=ru、360=cn 固定
      const isWg = c.type === 'wg';
      const regionKey = isWg ? currentRegion : c.region;
      const name = regionName(regionKey);
      const regionText = isWg
        ? `<span class="game-item-region">${escapeHtml(t('region_follows_account', { name }))}</span>`
        : `<span class="game-item-region">${escapeHtml(t('region_label', { name }))}</span>`;

      let canLaunch;
      if (c.type === 'cn') {
        canLaunch = false;
      } else if (isWg) {
        canLaunch = ['asia', 'eu', 'na'].includes(currentRegion);
      } else {
        canLaunch = c.region === currentRegion; // lesta → ru
      }

      let actionHtml;
      if (canLaunch) {
        actionHtml = `<button class="btn-primary game-launch-btn" data-root="${escapeHtml(c.root)}">${t('launch')}</button>`;
      } else if (c.type === 'cn') {
        actionHtml = `<span class="badge" title="${t('cn_not_supported')}">${t('cn_not_supported')}</span>`;
      } else {
        actionHtml = `<span class="badge" title="${t('region_mismatch')}">${t('region_mismatch')}</span>`;
      }

      item.innerHTML =
        '<div class="game-item-info">' +
        `<span class="game-item-label">${escapeHtml(c.label)}</span>` +
        `<span class="game-item-path">${escapeHtml(c.root)}</span>` +
        regionText +
        '</div>' +
        actionHtml;
      list.appendChild(item);
    }
    list.querySelectorAll('.game-launch-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const root = btn.dataset.root;
        const r = await window.launcherAPI.launchGame({ customPath: root });
        if (r && !r.ok) alert(r.error);
      });
    });
  } else {
    list.innerHTML = `<div class="mods-empty">${t('no_clients')}</div>`;
  }
}

document.getElementById('btn-refresh-games')?.addEventListener('click', () => loadGames());

document.querySelectorAll('.nav-item[data-page="games"]').forEach((item) => {
  item.addEventListener('click', () => loadGames());
});

loadGames();

// ---------- 游戏区服切换 ----------
const REGIONS = {
  asia: { code: 'ASIA' },
  eu: { code: 'EU' },
  na: { code: 'NA' },
  ru: { code: 'RU' }
};

function getRegion() {
  const config = loadConfig();
  return REGIONS[config.region] ? config.region : 'asia';
}

function applyRegion(region) {
  const r = REGIONS[region] ? region : 'asia';
  const select = document.getElementById('region-select');
  if (select) select.value = r;
  const serverValue = document.getElementById('server-region-value');
  if (serverValue) serverValue.textContent = REGIONS[r].code;
  const authRegion = document.getElementById('auth-region');
  if (authRegion) authRegion.value = r;
}

document.getElementById('region-select')?.addEventListener('change', () => {
  const region = document.getElementById('region-select').value;
  const config = loadConfig();
  config.region = region;
  saveConfig(config);
  applyRegion(region);
  loadNews();
  // 已登录时按新区服重新拉取战绩
  const auth = loadAuth();
  if (auth && auth.status === 'ok') loadAccountStats();
});

// 初始化首页区服展示
applyRegion(getRegion());

// ---------- 下载限速 ----------
function speedLimitLabel(speed) {
  if (speed <= 0) return t('unlimited');
  if (speed < 1048576) return Math.round(speed / 1024) + ' KB/s';
  const mb = speed / 1048576;
  return (Number.isInteger(mb) ? mb : mb.toFixed(1)) + ' MB/s';
}

function updateSpeedLimitDesc(value) {
  const desc = document.getElementById('speed-limit-desc');
  if (desc) desc.textContent = t('speed_current', { speed: speedLimitLabel(Number(value)) });
}

async function loadSpeedLimit() {
  const select = document.getElementById('download-speed-select');
  if (!select) return;
  let current = -1;
  try {
    const result = await window.launcherAPI.getSpeedLimit({ kind: 'wg' });
    if (result && result.ok) current = result.speedLimit;
  } catch {}
  if (select.querySelector(`option[value="${current}"]`)) {
    select.value = String(current);
  } else if (current <= 0) {
    select.value = '-1';
  } else {
    const opt = document.createElement('option');
    opt.value = String(current);
    opt.textContent = speedLimitLabel(current);
    select.appendChild(opt);
    select.value = String(current);
  }
  updateSpeedLimitDesc(select.value);
}

document.getElementById('download-speed-select')?.addEventListener('change', async () => {
  const select = document.getElementById('download-speed-select');
  const speed = Number(select.value);
  const r1 = await window.launcherAPI.setSpeedLimit({ kind: 'wg', speed });
  const r2 = await window.launcherAPI.setSpeedLimit({ kind: 'lesta', speed });
  if ((r1 && r1.ok) || (r2 && r2.ok)) {
    updateSpeedLimitDesc(String(speed));
  } else {
    alert((r1 && r1.error) || (r2 && r2.error) || t('set_failed'));
  }
});

loadSpeedLimit();

// ---------- 语言切换初始化 ----------
const langSelect = document.getElementById('lang-select');
if (langSelect) {
  langSelect.value = getLang();
  langSelect.addEventListener('change', () => {
    setLang(langSelect.value);
  });
}

// 应用当前语言到所有静态文本
applyI18n();

// ---------- 官方新闻 ----------
function formatNewsDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const locale = getLang() === 'ru' ? 'ru-RU' : (getLang() === 'en' ? 'en-US' : 'zh-CN');
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

async function loadNews() {
  const list = document.getElementById('news-list');
  const source = document.getElementById('news-source');
  if (!list) return;

  list.innerHTML = `<div class="mods-empty">${t('loading')}</div>`;
  const region = getRegion();
  if (source) source.textContent = regionName(region);

  let result;
  try {
    result = await window.launcherAPI.getNews({ region, lang: getLang() });
  } catch {
    result = null;
  }

  const news = result && result.ok ? result.news : [];
  if (!news || !news.length) {
    list.innerHTML = `<div class="news-empty">${t(result && result.ok ? 'news_no_items' : 'news_failed')}</div>`;
    return;
  }

  list.innerHTML = '';
  for (const n of news) {
    const card = document.createElement('div');
    card.className = 'news-card';
    const img = n.image ? `<img class="news-thumb" src="${escapeHtml(n.image)}" alt="" loading="lazy" onerror="this.style.display='none'" />` : '';
    const metaParts = [];
    if (n.category) metaParts.push(`<span class="news-category">${escapeHtml(n.category)}</span>`);
    if (n.date) metaParts.push(`<span class="news-date">${escapeHtml(formatNewsDate(n.date))}</span>`);
    const meta = metaParts.length ? `<div class="news-meta">${metaParts.join('')}</div>` : '';
    const desc = n.description ? `<p class="news-desc">${escapeHtml(n.description)}</p>` : '';
    card.innerHTML =
      img +
      '<div class="news-body">' +
      meta +
      `<h3 class="news-title">${escapeHtml(n.title || t('news_open'))}</h3>` +
      desc +
      '</div>';
    if (n.url) {
      card.title = t('news_open');
      card.addEventListener('click', () => {
        window.launcherAPI.openExternal({ url: n.url });
      });
    }
    list.appendChild(card);
  }
}

document.getElementById('btn-refresh-news')?.addEventListener('click', loadNews);

loadNews();

// ---------- 桌面快捷方式 ----------
document.getElementById('btn-create-shortcut')?.addEventListener('click', async () => {
  const btn = document.getElementById('btn-create-shortcut');
  const hint = document.getElementById('shortcut-hint');
  if (btn) btn.disabled = true;
  if (hint) hint.textContent = '…';
  try {
    const result = await window.launcherAPI.createShortcut();
    if (result && result.ok) {
      if (hint) hint.textContent = t('shortcut_success') + '：' + result.path;
    } else {
      alert((result && result.error) || t('shortcut_failed'));
      if (hint) hint.textContent = t('shortcut_hint');
    }
  } catch {
    alert(t('shortcut_failed'));
    if (hint) hint.textContent = t('shortcut_hint');
  }
  if (btn) btn.disabled = false;
});

// ---------- 软件更新 ----------
function setUpdateStatus(text) {
  const status = document.getElementById('update-status-text');
  if (status) status.textContent = text;
}

function showUpdateActions(downloadable, installable) {
  const actions = document.getElementById('update-actions');
  const btnDownload = document.getElementById('btn-download-update');
  const btnInstall = document.getElementById('btn-install-update');
  if (actions) actions.classList.toggle('hidden', !downloadable && !installable);
  if (btnDownload) btnDownload.classList.toggle('hidden', !downloadable);
  if (btnInstall) btnInstall.classList.toggle('hidden', !installable);
}

function setUpdateProgress(percent, text) {
  const progress = document.getElementById('update-progress');
  const fill = document.getElementById('update-progress-fill');
  const ptext = document.getElementById('update-progress-text');
  if (progress) progress.classList.remove('hidden');
  if (fill) fill.style.width = (percent || 0) + '%';
  if (ptext) ptext.textContent = text || '';
}

function formatBytes(n) {
  if (!n && n !== 0) return '';
  if (n < 1024) return n + ' B';
  if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
  return (n / 1048576).toFixed(1) + ' MB';
}

window.launcherAPI?.onUpdateStatus?.((data) => {
  const state = data && data.state;
  if (state === 'checking') {
    setUpdateStatus(t('update_checking'));
    showUpdateActions(false, false);
  } else if (state === 'available') {
    setUpdateStatus(t('update_available') + (data.version ? ' v' + data.version : ''));
    showUpdateActions(true, false);
  } else if (state === 'not-available') {
    setUpdateStatus(t('update_latest'));
    showUpdateActions(false, false);
  } else if (state === 'progress') {
    const pct = data.percent ? data.percent.toFixed(1) : 0;
    setUpdateProgress(pct, `${t('update_downloading')} ${pct}% · ${formatBytes(data.bytesPerSecond)}/s`);
    showUpdateActions(false, false);
  } else if (state === 'downloaded') {
    setUpdateStatus(t('update_downloaded') + (data.version ? ' v' + data.version : ''));
    document.getElementById('update-progress')?.classList.add('hidden');
    showUpdateActions(false, true);
  } else if (state === 'error') {
    setUpdateStatus(t('update_error') + (data.message ? ': ' + data.message : ''));
    showUpdateActions(false, false);
  }
});

document.getElementById('btn-check-update-app')?.addEventListener('click', async () => {
  const btn = document.getElementById('btn-check-update-app');
  if (btn) btn.disabled = true;
  setUpdateStatus(t('update_checking'));
  try {
    const result = await window.launcherAPI.checkUpdate();
    if (result && !result.ok && result.error) {
      setUpdateStatus(result.error);
      showUpdateActions(false, false);
    }
  } catch {
    setUpdateStatus(t('update_error'));
  }
  if (btn) btn.disabled = false;
});

document.getElementById('btn-download-update')?.addEventListener('click', async () => {
  const btn = document.getElementById('btn-download-update');
  if (btn) btn.disabled = true;
  try {
    await window.launcherAPI.downloadUpdate();
  } catch {}
  if (btn) btn.disabled = false;
});

document.getElementById('btn-install-update')?.addEventListener('click', () => {
  window.launcherAPI.installUpdate();
});
