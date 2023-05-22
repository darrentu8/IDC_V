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

const novoDirName = 'NovoDS.PlayLists'

contextBridge.exposeInMainWorld('myAPI', {
  minimize() {
    BrowserWindow.getFocusedWindow().minimize()
  },
  close() {
    BrowserWindow.getFocusedWindow().close()
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
  loadFile: () => {
    return new Promise((resolve, reject) => {
      const fileName = 'interactive.json'
      const appPath = app.getAppPath()
      console.log('appPath', appPath)
      const targetFile = path.join(appPath, fileName)
      if (!fs.existsSync(targetFile)) {
        alert('Novo Ds Studio has not been installed.')
        reject()
      } else {
        fs.readFile(targetFile, 'utf8', (err, data) => {
          if (err) throw err

          const obj = JSON.parse(data)
          console.log('Run Watch Json')
          console.log('obj', obj)
          const propOpenNew = obj.OpenNew // 需要監聽的屬性名稱
          const propFileData = {
            FileName: obj.FileName,
            FilePath: obj.FilePath,
            LayoutType: obj.LayoutType,
            ModelType: obj.ModelType,
            Orientation: obj.Orientation,
            PlaylistType: obj.PlaylistType
          }
          if (propOpenNew === 'true') {
            resolve('OpenNew')
          }
          if (propOpenNew === 'false' && propFileData.FilePath) {
            const result = loadXMLTest(propFileData.FilePath)
            console.log('result', result)
            resolve({ result, propFileData })
          }
        })
      }
    })
  },
  watchJson: () => {
    const fileName = 'interactive.json'
    const appPath = app.getAppPath()
    console.log('appPath', appPath)
    const targetFile = path.join(appPath, fileName)
    if (fs.existsSync(targetFile)) {
      console.log('targetFolder', targetFile)
      fs.watch(targetFile, (eventType, filename) => {
        if (filename && eventType === 'change') {
          fs.readFile(targetFile, 'utf8', (err, data) => {
            if (err) throw err

            const obj = JSON.parse(data)
            console.log('Run Watch Json')
            console.log('obj', obj)
            const propOpenNew = obj.OpenNew // 需要監聽的屬性名稱
            const propFilePath = obj.FilePath // 需要監聽的屬性名稱
            if (propOpenNew === 'true') {
              alert('OpenNew', propOpenNew)
            }
            if (propOpenNew === 'false' && propFilePath) {
              // alert('propFilePath', propFilePath)
              const result = loadXMLTest(propFilePath)
              return result
            }
            // switch (prop) {
            //   case 'DS310':
            //     console.log('DS310')
            //     break
            //   default:
            //     console.log(`Property "property" has been modified: ${prop}`)
            // }
          })
        }
      })
    }
  },
  closeWatchJson: () => {
    this.watcher.close()
    console.log('Close watch Json')
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
  chooseSources(nowPlayListFolder = '') {
    const sourcePaths = dialog.showOpenDialogSync({
      title: 'Choose Media',
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif', 'mkv', 'avi', 'mp4'] }
      ],
      properties: ['openFile', 'multiSelections']
    })

    if (!sourcePaths) {
      return []
    }

    const sourceFolder = getSourceFolder()
    const fileDataArray = []

    for (const sourcePath of sourcePaths) {
      const fileName = path.basename(sourcePath)
      const targetFolder = nowPlayListFolder || sourceFolder
      const targetPath = path.join(targetFolder, fileName)
      console.log('targetFolder', targetFolder)
      const relativePath = path.relative(targetFolder, targetPath)

      if (!isDuplicateFile(targetPath)) {
        try {
          fs.copyFileSync(sourcePath, targetPath)
        } catch (err) {
          console.error(err)
          continue
        }
      }

      fileDataArray.push({ fileName, targetPath, relativePath })
    }

    return fileDataArray
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
            _targetPath: fileData.relativePath
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
  deleteFile(nowPlayListFolder = '', sourceFile) {
    const sourceFolder = getSourceFolder()
    if (nowPlayListFolder) {
      const targetPath = path.join(nowPlayListFolder, sourceFile)
      fs.unlinkSync(targetPath)
    } else {
      const targetPath = path.join(sourceFolder, sourceFile)
      fs.unlinkSync(targetPath)
    }
  }
})
const loadXMLTest = (propFilePath) => {
  const fileName = 'index.xml'
  console.log('propFilePath', propFilePath)

  const targetFile = path.join(propFilePath, fileName)
  if (!fs.existsSync(targetFile)) {
    alert('file read error', fileName)
  }

  console.log('targetFile', targetFile)
  const x2js = new X2js({
    attributePrefix: '_'
  })

  const xml = fs.readFileSync(targetFile, 'utf-8')
  const parser = x2js.xml2js(xml)

  return parser
}
const isDuplicateFile = (targetPath) => {
  const existingFiles = fs.readdirSync(getSourceFolder())
  return existingFiles.includes(path.basename(targetPath))
}
const getSourceFolder = () => {
  const NovoFolder = getNovoFolder()
  const SourceFolder = path.join(NovoFolder, '@_Temp_interactive')
  if (!fs.existsSync(SourceFolder)) {
    fs.mkdirSync(SourceFolder)
  }

  return SourceFolder
}
const getNovoFolder = () => {
  const homedir = require('os').homedir()
  const folder = path.join(homedir, novoDirName)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
  console.log('folder', folder)
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
