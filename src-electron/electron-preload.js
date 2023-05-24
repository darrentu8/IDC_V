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
    return new Promise((resolve, reject) => {
      const NovoFolder = getNovoFolder()
      const strftime = require('strftime')
      const timestamp = strftime('%Y%m%d%H%M%S', new Date())
      const nowPlayListName = `@_Temp_PlayList_${timestamp}`
      const PlayListFolder = path.join(NovoFolder, nowPlayListName)
      if (!fs.existsSync(PlayListFolder)) {
        fs.mkdir(PlayListFolder, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve({ NovoFolder, nowPlayListName })
          }
        })
      } else {
        resolve({ NovoFolder, nowPlayListName })
      }
    })
  },
  checkJson: () => {
    const appPath = app.getAppPath()
    const data = {
      Focus: 'signage',
      OpenNew: 'true',
      Reload: 'true',
      FileName: '',
      FilePath: '',
      LayoutType: '',
      ModelType: '',
      Orientation: '',
      PlaylistType: ''
    }
    const fileName = 'interactive.json'
    const targetFile = path.join(appPath, fileName)
    if (!fs.existsSync(targetFile)) {
      alert('NovoDs Studio has not been installed.')
      try {
        fs.writeFileSync(targetFile, JSON.stringify(data))
        console.log('interactive.json has been added!')
      } catch (err) {
        console.error(err)
      }
    }
  },
  loadConfigFile: () => {
    return new Promise((resolve, reject) => {
      const fileName = 'interactive.json'
      const appPath = app.getAppPath()
      const targetFile = path.join(appPath, fileName)
      if (!fs.existsSync(targetFile)) {
        alert('NovoDs Studio has not been installed.')
        const defaultFileData = {
          Focus: 'signage',
          OpenNew: 'true',
          Reload: 'false',
          FileName: '',
          FilePath: '',
          LayoutType: '',
          ModelType: '',
          Orientation: '',
          PlaylistType: '',
          Preview: {
            Ready: 'false',
            Path: ''
          }
        }
        resolve({ openType: 'new', defaultFileData })
      } else {
        fs.readFile(targetFile, 'utf8', (err, data) => {
          if (err) throw err
          if (!data) { // 如果 data 不存在则直接返回 null
            resolve(null)
            return
          }

          const obj = JSON.parse(data)
          console.log('Run Watch Json')
          console.log('obj', obj)
          const propFocus = obj.Focus
          const propOpenNew = obj.OpenNew
          const propFileData = {
            FileName: obj.FileName,
            FilePath: obj.FilePath,
            LayoutType: obj.LayoutType,
            ModelType: obj.ModelType,
            Orientation: obj.Orientation,
            PlaylistType: obj.PlaylistType
          }
          if (propFocus === 'signage') {
            if (propOpenNew === 'true') {
              resolve({ openType: 'new', propFileData })
            }
            if (propOpenNew === 'false' && propFileData.FilePath) {
              const targetFile = path.join(propFileData.FilePath, propFileData.FileName)
              const result = transXml(targetFile)
              console.log('result', result)
              resolve({
                openType: 'load',
                propFileData,
                result
              })
            }
          } else {
            resolve(null)
          }
        })
      }
    })
  },
  watchJson: () => {
    const fileName = 'interactive.json'
    const appPath = app.getAppPath()
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
            const propFocus = obj.Focus
            const propOpenNew = obj.OpenNew
            const propFileName = obj.FileName
            const propFilePath = obj.FilePath
            if (propFocus === 'signage') {
              focusWindow()
              if (propOpenNew === 'true' && !propFilePath) {
                // 呼叫主進程重新啟動應用程序
                // ipcRenderer.send('app-restart')
              }
              if (propOpenNew === 'false' && propFilePath) {
                const targetFile = path.join(propFilePath, propFileName)
                console.log('targetFile', targetFile)
                const result = transXml(targetFile)
                return result
              }
              // // Modify the contents of targetFile
              // obj.someProperty = 'new value'
              // fs.writeFile(targetFile, JSON.stringify(obj), (err) => {
              //   if (err) throw err
              //   console.log('File has been saved')
              // })
            } else {
              return null
            }
          })
        }
      })
    }
  },
  closeWatchJson: () => {
    if (this.watcher) {
      this.watcher.close()
      console.log('Close watch Json')
    }
  },
  async storeToXML(playListName, nowPlayListFolder, nowPlayListPath, NovoDsData) {
    // console.log('playListName', playListName)
    // console.log('nowPlayListFolder', nowPlayListFolder)
    // console.log('nowPlayListPath', nowPlayListPath)
    // console.log('NovoDsData', NovoDsData)
    const newPlayListPath = path.join(nowPlayListFolder, playListName)
    const xmlData = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + NovoDsData
    const { targetFile, xmlData: data } = await writeAndCopyFolder(nowPlayListPath, newPlayListPath, xmlData)

    return { targetFile, xmlData: data }
  },
  openSaveFolder(exportPath) {
    console.log('exportPath', exportPath)
    opn(exportPath)
  },
  chooseSources(nowPlayListPath = '') {
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

    const fileDataArray = []

    for (const sourcePath of sourcePaths) {
      const fileName = path.basename(sourcePath)
      const targetFolder = nowPlayListPath
      const targetPath = path.join(targetFolder, fileName)
      console.log('targetFolder', targetFolder)
      console.log('sourcePath', sourcePath)
      console.log('sourcePaths', sourcePaths)
      const relativePath = path.relative(targetFolder, targetPath)

      if (!isDuplicateFile(targetFolder, targetPath)) {
        try {
          fs.copyFileSync(sourcePath, targetPath)
        } catch (err) {
          console.error(err)
          continue
        }
      } else {
        alert('The same file is already in the same state exists!')
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
  delTempFolder: async (nowPlayListPath) => {
    if (nowPlayListPath) {
      try {
        await fs.rmdirSync(nowPlayListPath, { recursive: true })
        console.log(`${nowPlayListPath} 已被刪除`)
        closeWindow()
      } catch (error) {
        console.error(`刪除 ${nowPlayListPath} 時發生錯誤：`, error)
      }
    }
  },
  deleteFile(nowPlayListPath = '', sourceFile) {
    const sourceFolder = getSourceFolder()
    if (nowPlayListPath) {
      const targetPath = path.join(nowPlayListPath, sourceFile)
      fs.unlinkSync(targetPath)
    } else {
      const targetPath = path.join(sourceFolder, sourceFile)
      fs.unlinkSync(targetPath)
    }
  }
})
const writeAndCopyFolder = (nowPlayListPath, newPlayListPath, xmlData) => {
  const indexFile = path.join(nowPlayListPath, 'index.xml')

  return new Promise((resolve, reject) => {
    // 寫入檔案
    fs.writeFile(indexFile, xmlData, (err) => {
      if (err) reject(err)

      // 複製資料夾
      fs.mkdir(newPlayListPath, { recursive: true }, (err) => {
        if (err) reject(err)

        fs.readdir(nowPlayListPath, (err, files) => {
          if (err) reject(err)

          files.forEach(file => {
            const sourcePath = path.join(nowPlayListPath, file)
            const targetPath = path.join(newPlayListPath, file)

            const readStream = fs.createReadStream(sourcePath)
            const writeStream = fs.createWriteStream(targetPath)

            readStream.on('error', reject)
            writeStream.on('error', reject)

            readStream.pipe(writeStream)
          })

          resolve({
            targetFile: newPlayListPath,
            xmlData
          })
        })
      })
    })
  })
}
const closeWindow = () => {
  BrowserWindow.getFocusedWindow().close()
}
const transXml = (propFilePath) => {
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
const isDuplicateFile = (targetFolder, targetPath) => {
  const existingFiles = fs.readdirSync(checkSourceFolder(targetFolder))
  return existingFiles.includes(path.basename(targetPath))
}
const checkSourceFolder = (targetFolder) => {
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  return targetFolder
}
const getSourceFolder = () => {
  const NovoFolder = getNovoFolder()
  const strftime = require('strftime')
  const timestamp = strftime('%Y%m%d%H%M%S', new Date())
  const newPlayListName = `PlayList_${timestamp}`
  const SourceFolder = path.join(NovoFolder, newPlayListName)
  if (!fs.existsSync(SourceFolder)) {
    fs.mkdirSync(SourceFolder)
  }

  return SourceFolder
}
const getNovoFolder = () => {
  const osType = require('os').type()
  let folder
  if (osType === 'Windows_NT') {
    // Windows 操作系统
    const winDir = process.env.USERPROFILE
    folder = path.join(winDir, novoDirName)
  } else {
    // Linux 或 macOS 操作系统
    const homeDir = require('os').homedir()
    folder = path.join(homeDir, novoDirName)
  }

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
  console.log('folder', folder)
  return folder
}
const focusWindow = () => {
  // 取得當前的視窗對象
  let window = BrowserWindow.getFocusedWindow()

  // 如果目前沒有任何視窗被聚焦，則選擇第一個視窗
  if (!window) {
    window = BrowserWindow.getAllWindows()[0]
  }

  // 聚焦到該視窗
  if (window) {
    window.focus()
  }
  return window
}
