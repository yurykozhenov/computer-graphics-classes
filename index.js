const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

global.__dirname = __dirname;

const indexPath = `file://${__dirname}/build/index.html`;

app.on('ready', () => {
  new BrowserWindow({
    width: 1280,
    height: 720
  }).loadURL(indexPath);
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
