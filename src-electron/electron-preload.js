/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.js you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

import { contextBridge } from 'electron'
import { BrowserWindow, app } from '@electron/remote'
import path from 'path'
import fs from 'fs'
import xml2js from 'xml2js'

contextBridge.exposeInMainWorld('myAPI', {
  minimize() {
    BrowserWindow.getFocusedWindow().minimize()
  },

  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow()

    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  },

  close() {
    BrowserWindow.getFocusedWindow().close()
  },
  loadJSONTest: () => {
    const fileName = 'test.json'

    const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)
    const sourceFile = path.join(publicFolder, fileName)

    const targetFolder = path.join(app.getPath('appData'), 'IDC')
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder)
    }

    const targetFile = path.join(targetFolder, fileName)
    if (!fs.existsSync(targetFile)) {
      fs.copyFileSync(sourceFile, targetFile)
    }

    return fs.readFileSync(targetFile, 'utf8')
  },
  watchJson: () => {
    const fileName = 'NovoDS Studio/interactive.json'

    const targetFolder = path.join(app.getPath('appData'), fileName)

    console.log('targetFolder', targetFolder)
    fs.watch(targetFolder, (eventType, filename) => {
      if (filename && eventType === 'change') {
        fs.readFile(targetFolder, 'utf8', (err, data) => {
          if (err) throw err

          const obj = JSON.parse(data)
          console.log('Run Watch Json')
          console.log('obj', obj)
          const prop = obj.NovoDS._Model_Type // 需要監聽的屬性名稱
          switch (prop) {
            case 'DS310':
              console.log('DS310')
              break
            default:
              console.log(`Property "property" has been modified: ${prop}`)
          }
        })
      }
    })
  },
  closeWatchJson: () => {
    this.watcher.close()
    console.log('Close watch Json')
  },
  loadXMLTest: () => {
    const fileName = 'index.xml'

    const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)
    const sourceFile = path.join(publicFolder, fileName)

    const targetFolder = path.join(app.getPath('appData'), 'IDC')
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder)
    }

    const targetFile = path.join(targetFolder, fileName)
    if (!fs.existsSync(targetFile)) {
      fs.copyFileSync(sourceFile, targetFile)
    }

    const xml = fs.readFileSync(targetFile)
    const parser = new xml2js.Parser()

    return parser.parseStringPromise(xml)
  },
  exportXmlFile: (data, folderName) => {
    const fileName = 'test.xml'

    const playListFolder = path.join(app.getPath('appData'), 'IDC', 'Playlist')
    if (!fs.existsSync(playListFolder)) {
      fs.mkdirSync(playListFolder)
    }

    const targetFolder = path.join(playListFolder, folderName)
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder)
    }

    const targetFile = path.join(targetFolder, fileName)

    const builder = new xml2js.Builder()
    const xml = builder.buildObject(data)

    fs.writeFileSync(targetFile, xml)

    return xml
  }
})
