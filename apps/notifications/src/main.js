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
  console.log('main line:14', config, config?.tabs?.length);
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
