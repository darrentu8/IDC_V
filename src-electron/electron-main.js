import { app, BrowserWindow, nativeTheme, Menu } from 'electron'
import { initialize, enable } from '@electron/remote/main'
import path from 'path'
import os from 'os'

const socket = require('express')()
const http = require('http').Server(socket)
const io = require('socket.io')(http)
const port = process.env.PORT || 3002

// socket.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

socket.get('/texto/:text', (req, res) => {
  const params = req.params.text
  io.emit('texto', params)
  res.send({ mensagem: `Texto: ${params}` })
})

http.listen(port, function () {
  console.log('WEBSOCKET listening on *:' + port)
})

initialize()

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

let mainWindow

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    show: false,
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1366,
    height: 768,
    frame: false,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  enable(mainWindow.webContents)

  mainWindow.loadURL(process.env.APP_URL)
  // mainWindow.maximize()

  Menu.setApplicationMenu(null)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
