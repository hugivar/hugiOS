const electron = require('electron');
const app = electron.app;

const config = require("../config.json");

app.on('ready', function () {
  const mainWindow = new electron.BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    }
  });

  const url = config?.tabs?.length > 0 ? 'file://' + __dirname + '/index.html' : config?.url;
  mainWindow.loadURL(url);
  mainWindow.on('ready-to-show', function () {
    mainWindow.show();
    mainWindow.focus();
  });
});

app.on('window-all-closed', () => {
  app.dock.hide() // for macOS
})
