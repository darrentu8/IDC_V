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
import { BrowserWindow, app, dialog } from '@electron/remote'
import opn from 'opn'
import path from 'path'
import fs from 'fs'
import X2js from 'x2js'
// import xml2js from 'xml2js'

const novoDirName = 'NovoDS Studio'

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
  setPlayListFolder() {
    const NovoFolder = getNovoFolder()
    const strftime = require('strftime')
    const timestamp = strftime('%Y%m%d%H%M%S', new Date())
    const newPlayListName = `PlayList_${timestamp}`
    const PlayListFolder = path.join(NovoFolder, newPlayListName)
    if (!fs.existsSync(PlayListFolder)) {
      fs.mkdirSync(PlayListFolder)
    }
    return { PlayListFolder, newPlayListName }
  },
  close() {
    BrowserWindow.getFocusedWindow().close()
  },
  watchJson: () => {
    const fileName = 'interactive.json'

    const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)
    const sourceFile = path.join(publicFolder, fileName)

    const NovoFolder = getNovoFolder()

    const targetFile = path.join(NovoFolder, fileName)
    if (!fs.existsSync(targetFile)) {
      fs.copyFileSync(sourceFile, targetFile)
    }

    console.log('targetFolder', targetFile)
    fs.watch(targetFile, (eventType, filename) => {
      if (filename && eventType === 'change') {
        fs.readFile(targetFile, 'utf8', (err, data) => {
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
  loadJSONTest: () => {
    const fileName = 'interactive.json'

    const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)
    const sourceFile = path.join(publicFolder, fileName)

    const NovoFolder = getNovoFolder()

    const targetFile = path.join(NovoFolder, fileName)
    if (!fs.existsSync(targetFile)) {
      fs.copyFileSync(sourceFile, targetFile)
    }

    return fs.readFileSync(targetFile, 'utf8')
  },
  loadXMLTest: () => {
    const fileName = 'index.xml'
    const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)
    const sourceFile = path.join(publicFolder, fileName)

    const NovoFolder = getNovoFolder()

    const targetFile = path.join(NovoFolder, fileName)
    if (!fs.existsSync(targetFile)) {
      fs.copyFileSync(sourceFile, targetFile)
    }

    const x2js = new X2js({
      attributePrefix: '_'
    })

    const xml = fs.readFileSync(targetFile, 'utf-8')
    const parser = x2js.xml2js(xml)

    return parser
  },
  storeToXML(nowPlayListFolder, NovoDsData) {
    const fileName = 'index.xml'
    const xmlData = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + NovoDsData
    // const PlayListFolder = getPlayListFolder()

    const targetFile = path.join(nowPlayListFolder, fileName)

    // const builder = new xml2js.Builder({ headless: true, attrkey: '_attr' })
    // const xml = builder.buildObject(NovoDsData)

    fs.writeFileSync(targetFile, xmlData)

    return { nowPlayListFolder, xmlData }
  },
  openSaveFolder(nowPlayListFolder) {
    console.log('nowPlayListFolder', nowPlayListFolder)
    opn(nowPlayListFolder)
  },
  chooseSources(nowPlayListFolder) {
    const sourcePaths = dialog.showOpenDialogSync({
      title: 'Choose Media',
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif', 'mkv', 'avi', 'mp4'] }
      ],
      properties: ['openFile', 'multiSelections']
    })

    if (sourcePaths) {
      // const sourceFolder = getSourceFolder()
      const fileDataArray = []

      sourcePaths.forEach((sourcePath) => {
        const fileName = path.basename(sourcePath)
        const targetPath = path.join(nowPlayListFolder, fileName)

        if (!isDuplicateFile(targetPath)) {
          try {
            fs.copyFileSync(sourcePath, targetPath)
            fileDataArray.push({ fileName, targetPath })
          } catch (err) {
            console.error(err)
          }
        } else {
          fileDataArray.push({ fileName, targetPath })
        }
      })

      return fileDataArray
    }
  },
  async getFileData(fileDatas) {
    const promises = fileDatas.map((fileData) => {
      return fs.promises.stat(fileData.targetPath)
        .then((stats) => {
          const fileDataWithSize = {
            _note: '',
            _type: '',
            _duration: '10',
            _videoDuration: '0',
            _fileSize: stats.size,
            _src: fileData.fileName,
            _targetPath: fileData.targetPath
          }
          // Get file type based on extension
          if (stats.isFile()) {
            const extname = path.extname(fileData.targetPath)
            switch (extname.toLowerCase()) {
              case '.pdf':
                fileDataWithSize._type = 'pdf'
                fileDataWithSize._duration = '10'
                break
              case '.jpg':
              case '.jpeg':
              case '.png':
                fileDataWithSize._type = 'image'
                fileDataWithSize._duration = '10'
                break
              case '.mp4':
              case '.avi':
              case '.mkv':
                fileDataWithSize._type = 'video'
                fileDataWithSize._duration = '0'
                break
              default:
                fileDataWithSize._type = 'unknown'
            }
          } else {
            fileDataWithSize._type = 'unknown'
          }
          console.log(stats)
          console.log(fileDataWithSize)
          return fileDataWithSize
        })
        .catch((err) => {
          console.error(err)
          return null
        })
    })

    const resolvedPromises = await Promise.all(promises)
    const validFileDatas = resolvedPromises.filter(fileData => fileData !== null)
    return validFileDatas
  },
  deleteFile(sourceFile) {
    console.log('sourceFile', sourceFile)
    fs.unlinkSync(sourceFile)
  }
})

const isDuplicateFile = (targetPath) => {
  const existingFiles = fs.readdirSync(getSourceFolder())
  return existingFiles.includes(path.basename(targetPath))
}
const getNovoFolder = () => {
  const folder = path.join(app.getPath('appData'), novoDirName)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }

  return folder
}
// const getPlayListFolder = () => {
//   const NovoFolder = getNovoFolder()
//   const strftime = require('strftime')
//   const timestamp = strftime('%Y%m%d%H%M%S', new Date())
//   const newPlayListName = `PlayList_${timestamp}`
//   const PlayListFolder = path.join(NovoFolder, newPlayListName)
//   if (!fs.existsSync(PlayListFolder)) {
//     fs.mkdirSync(PlayListFolder)
//   }

//   return PlayListFolder
// }

const getSourceFolder = () => {
  const NovoFolder = getNovoFolder()
  const SourceFolder = path.join(NovoFolder, 'Source')
  if (!fs.existsSync(SourceFolder)) {
    fs.mkdirSync(SourceFolder)
  }

  return SourceFolder
}
