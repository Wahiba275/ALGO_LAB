// AlgoLab pour Windows — © 2026 Wahiba BOUZYAN
// Avec internet : ouvre la version en ligne (toujours à jour, Mode TP connecté à Firebase).
// Sans internet : ouvre la copie intégrée à l'installateur.
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

const EN_LIGNE = 'https://wahiba275.github.io/ALGO_LAB/app/';
const LOCAL = path.join(__dirname, 'www', 'app', 'index.html');

function creerFenetre() {
  const win = new BrowserWindow({
    width: 1366,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    title: 'AlgoLab',
    icon: path.join(__dirname, 'www', 'icon.png'),
    backgroundColor: '#13171e',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      devTools: !app.isPackaged // outils de développement désactivés dans l'application installée
    }
  });
  Menu.setApplicationMenu(null);

  let copieLocale = false;
  win.webContents.on('did-fail-load', (_e, _code, _desc, _url, principal) => {
    if (principal && !copieLocale) {
      copieLocale = true;
      win.loadFile(LOCAL);
    }
  });

  // Les liens externes s'ouvrent dans le navigateur, pas dans AlgoLab.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (url.startsWith(EN_LIGNE) || url.startsWith('file:')) return;
    e.preventDefault();
    if (/^https?:/i.test(url)) shell.openExternal(url);
  });

  win.loadURL(EN_LIGNE);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const [w] = BrowserWindow.getAllWindows();
    if (w) { if (w.isMinimized()) w.restore(); w.focus(); }
  });
  app.whenReady().then(creerFenetre);
  app.on('window-all-closed', () => app.quit());
}
