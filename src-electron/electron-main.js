import { app, BrowserWindow, nativeTheme, Menu } from 'electron'
import { initialize, enable } from '@electron/remote/main'
import path from 'path'
import os from 'os'

const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server
const wss = new WebSocketServer({
  port: 6001
})

const Data = {
  Command: 'Reload',
  LayoutType: 0,
  ModelType: 'DS310',
  Orientation: 3,
  Playlist: 'pppp',
  PlaylistPath: '/Users/darren/NovoDS.PlayLists',
  Preview: {
    Path: '',
    Ready: false
  }
}

wss.on('connection', function (ws) {
  console.log('[SERVER] connection()')
  ws.send(JSON.stringify(Data))
  ws.on('message', function (message) {
    console.log('[SERVER] Received:' + message)
  })
})

// socket.io
// const express = require('express')
// const ex = express()
// const http = require('http').createServer(ex)
// const io = require('socket.io')(http, {
//   cors: {
//     origin: '*'
//   }
// })
// const port = process.env.PORT || 6001
// const Data = {
//   Command: 'OpenNew',
//   LayoutType: 0,
//   ModelType: 'DS310',
//   Orientation: 3,
//   Playlist: '',
//   PlaylistPath: '/Users/darren/NovoDS.PlayLists/',
//   Preview: {
//     Path: '',
//     Ready: false
//   }
// }
// // 在客戶端中發送事件
// io.on('connection', (socket) => {
//   socket.emit('message', 'Hello, server!')
//   socket.on('message', (data) => {
//     console.log(`Received message: ${data.text}`)
//   })
//   socket.emit('message', Data)
// })

// http.listen(port, () => {
//   console.log(`WebSocket listening on *:${port}`)
// })

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
