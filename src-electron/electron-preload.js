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
import { BrowserWindow, dialog } from '@electron/remote'
import opn from 'opn'
import path from 'path'
import fs from 'fs'
import X2js from 'x2js'

const novoDirName = 'NovoDS.PlayLists'
const interactiveFileName = 'interactive.json'
const xmlFileName = 'index.xml'

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
  // 建立 PlayList Temp
  setPlayListFolder() {
    return new Promise((resolve, reject) => {
      const NovoFolder = getNovoFolder()
      const strftime = require('strftime')
      const timestamp = strftime('%Y%m%d%H%M%S', new Date())
      const nowPlayListName = `@_Temp_PlayList_${timestamp}`
      const PlayListFolder = path.join(NovoFolder, nowPlayListName)
      // process.env.RESOURCES_PATH = NovoFolder
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
      .catch((error) => {
        console.error(error)
        return Promise.reject(error)
      })
  },
  // 檢查建立Json
  checkJson: () => {
    const appPath = getDirFolder()
    console.log('appPath', appPath)
    const data = {
      Focus: 'signage',
      LayoutType: 0,
      ModelType: '',
      OpenNew: true,
      Reload: false,
      Orientation: 0,
      Playlist: '',
      PlaylistPath: '',
      Preview: {
        Path: '',
        Ready: false
      }
    }
    const targetFile = path.join(appPath, interactiveFileName)
    console.log('targetFile', targetFile)

    return new Promise((resolve, reject) => {
      try {
        fs.access(targetFile, (exists) => {
          if (!exists) {
            alert('NovoDs Studio has not been installed.')
            fs.writeFile(targetFile, JSON.stringify(data), (err) => {
              if (err) {
                console.error(err)
                reject(err)
              } else {
                console.log('interactive.json has been added!')
                resolve()
              }
            })
          } else {
            resolve()
          }
        })
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  },
  // 讀取Json檔
  loadConfigFile: () => {
    const appPath = getDirFolder()
    const targetFile = path.join(appPath, interactiveFileName)
    // 未建立或建立失敗
    if (!fs.existsSync(targetFile)) {
      alert('The interactive file could not be found!')
      const defaultFileData = {
        Focus: 'signage',
        LayoutType: 0,
        ModelType: '',
        OpenNew: true,
        Reload: false,
        Orientation: 0,
        Playlist: '',
        PlaylistPath: '',
        Preview: {
          Path: '',
          Ready: false
        }
      }
      return Promise.resolve({ openType: 'new', defaultFileData })
    }
    // 已建立
    return new Promise((resolve, reject) => {
      fs.readFile(targetFile, 'utf8', (err, data) => {
        if (err) {
          return reject(err)
        }

        if (!data) { // 如果 data 不存在则直接返回 null
          console.log('No Json data')
          return resolve(null)
        }

        const obj = JSON.parse(data)
        console.log('Run Watch Json')
        console.log('obj', obj)
        const propFocus = obj.Focus
        const propOpenNew = obj.OpenNew
        const propFileData = {
          ...obj
        }

        if (propFocus === 'signage') {
          focusWindow()
          // 開新檔案
          if (propOpenNew === true) {
            console.log('propFileData', propFileData)
            resolve({ openType: 'new', propFileData })
          } else if (propOpenNew === false && propFileData.PlaylistPath) {
            const targetFile = path.join(propFileData.PlaylistPath, propFileData.Playlist)
            const result = transXml(targetFile)
            console.log('result', result)

            resolve({
              openType: 'load',
              propFileData,
              result
            })
          }
          console.log('Json資料錯誤！')
          // 例外情況暫不處理
          resolve(null)
        } else {
          console.log('Json資料錯誤！')
          // 例外情況暫不處理
          resolve(null)
        }
      })
    })
      .catch(error => {
        console.error(error)
        return Promise.reject(error)
      })
  },
  watchJson: () => {
    return new Promise((resolve, reject) => {
      const appPath = getDirFolder()
      const targetFile = path.join(appPath, interactiveFileName)

      if (!fs.existsSync(targetFile)) {
        reject(new Error(`File ${targetFile} does not exist`))
      }

      fs.watch(targetFile, (eventType, filename) => {
        if (filename && eventType === 'change') {
          fs.readFile(targetFile, 'utf8', (err, data) => {
            if (err) {
              reject(err)
            } else {
              const obj = JSON.parse(data)
              console.log('Run Watch Json')
              console.log('obj', obj)
              const propReload = obj.Reload // true則重新讀取整份
              // const propFocus = obj.Focus // signage || studio
              const propOpenNew = obj.OpenNew
              // const propFileName = obj.Playlist
              // const propFilePath = obj.PlaylistPath
              const propFileData = { ...obj }

              // 如果重load
              if (propReload) {
                focusWindow()
                // 開新檔案
                if (propOpenNew === true) {
                  console.log('propFileData', propFileData)
                  resolve({ openType: 'new', propFileData })
                } else if (propOpenNew === false && propFileData.PlaylistPath) {
                  const targetFile = path.join(propFileData.PlaylistPath, propFileData.Playlist)
                  const result = transXml(targetFile)
                  console.log('result', result)

                  resolve({
                    openType: 'load',
                    propFileData,
                    result
                  })
                } else {
                  // 例外情況暫不處理
                  console.log('Json資料錯誤！')
                  resolve(null)
                }
              } else {
                // 沒重load
                console.log('Json資料錯誤！')
                resolve(null)
              }
            }
          })
        }
      })
    })
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
const writeAndCopyFolder = async (nowPlayListPath, newPlayListPath, xmlData) => {
  try {
    // Check if paths are the same
    if (nowPlayListPath === newPlayListPath) {
      return Promise.resolve({
        targetFile: newPlayListPath,
        xmlData
      })
    }

    const indexFile = path.join(nowPlayListPath, 'index.xml')

    // 寫入檔案
    await fs.promises.writeFile(indexFile, xmlData)

    // 複製資料夾
    await fs.promises.mkdir(newPlayListPath, { recursive: true })

    const files = await fs.promises.readdir(nowPlayListPath)

    for (const file of files) {
      const sourcePath = path.join(nowPlayListPath, file)
      const targetPath = path.join(newPlayListPath, file)

      const readStream = fs.createReadStream(sourcePath)
      const writeStream = fs.createWriteStream(targetPath)

      await new Promise((resolve, reject) => {
        readStream.on('error', reject)
        writeStream.on('error', reject)
        writeStream.on('finish', resolve)
        readStream.pipe(writeStream)
      })
    }

    return {
      targetFile: newPlayListPath,
      xmlData
    }
  } catch (err) {
    console.error(`Error in writeAndCopyFolder: ${err.message}`)
    throw err
  }
}

// 轉XML檔案成物件
const transXml = (propFilePath) => {
  console.log('propFilePath', propFilePath)

  const targetFile = path.join(propFilePath, xmlFileName)
  if (!fs.existsSync(targetFile)) {
    alert('file read error', xmlFileName)
  }

  console.log('targetFile', targetFile)
  const x2js = new X2js({
    attributePrefix: '_'
  })

  const xml = fs.readFileSync(targetFile, 'utf-8')
  const parser = x2js.xml2js(xml)

  return parser
}
// 檢查目標重複上傳檔案1
const isDuplicateFile = (targetFolder, targetPath) => {
  const existingFiles = fs.readdirSync(checkSourceFolder(targetFolder))
  return existingFiles.includes(path.basename(targetPath))
}
// 檢查目標重複上傳檔案2
const checkSourceFolder = (targetFolder) => {
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  return targetFolder
}
// 取得APP安裝資料夾
const getDirFolder = () => {
  const osType = require('os').type()
  let appPath
  if (osType === 'Windows_NT') {
    // Windows 操作系统
    appPath = getDirFolder()
  } else {
    appPath = __dirname
  }
  return appPath
}
// 取得USER資料夾並創建PlayList_yyyyMMddhhmmss
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
// 取得USER資料夾
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
const closeWindow = () => {
  BrowserWindow.getFocusedWindow().close()
}
