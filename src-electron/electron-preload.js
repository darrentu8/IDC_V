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
const xmlFileName = 'index.xml'

contextBridge.exposeInMainWorld('myAPI', {
  focusWindow() {
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
  },
  closeWindow() {
    BrowserWindow.getFocusedWindow().close()
  },
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
      process.env.RESOURCES_PATH = NovoFolder
      const strftime = require('strftime')
      const timestamp = strftime('%Y%m%d%H%M%S', new Date())
      const nowPlayListName = `@_Temp_Playlist_${timestamp}`
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
      .catch((error) => {
        console.error(error)
        return Promise.reject(error)
      })
  },
  transXml(propFilePath) {
    console.log('propFilePath', propFilePath)

    const targetFile = path.join(propFilePath, xmlFileName)
    try {
      if (!fs.existsSync(targetFile)) {
        throw new Error(`XML file read error: ${xmlFileName}`)
      }

      console.log('targetFile', targetFile)
      const x2js = new X2js({
        attributePrefix: '_'
      })

      const xml = fs.readFileSync(targetFile, 'utf-8')
      const parser = x2js.xml2js(xml)

      return parser
    } catch (error) {
      console.error(error)
      // Handle the error here or re-throw it.
    }
  },
  async watchSameFileName(_Playlist_Name, nowPlayListPath) {
    const NovoFolder = getNovoFolder()
    const oldPlayListName = path.basename(nowPlayListPath)
    try {
      return new Promise((resolve, reject) => {
        if (!_Playlist_Name) {
          resolve(false)
        }
        if (_Playlist_Name !== oldPlayListName) {
          fs.readdir(NovoFolder, (err, files) => {
            if (err) {
              // 發生錯誤時回傳 reject
              resolve(false)
            } else {
              // 檢查是否有相同名稱的資料夾
              const sameFolderExists = files.some((fileName) => {
                return fileName === _Playlist_Name
              })
              resolve(!sameFolderExists) // 回傳 true 或 false
            }
          })
        } else {
          resolve(true)
        }
      })
    } catch (error) {
      console.error(error)
    }
  },
  async storeToXML(playListName, nowPlayListFolder, nowPlayListPath, NovoDsData) {
    try {
      if (typeof playListName === 'number') {
        playListName = playListName.toString()
      }
      const newPlayListPath = path.join(nowPlayListFolder, playListName)
      const xmlData = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + NovoDsData
      const { targetFile, xmlData: data } = await writeAndCopyFolder(nowPlayListPath, newPlayListPath, xmlData)

      return { targetFile, xmlData: data }
    } catch (error) {
      console.error(error)
    }
  },
  openSaveFolder(exportPath) {
    console.log('exportPath', exportPath)
    opn(exportPath)
  },
  chooseSources(nowPlayListPath = '') {
    console.log('nowPlayListPath', nowPlayListPath)
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
        // alert('The same file is already in the same state exists!')
      }

      fileDataArray.push({ fileName, targetPath, relativePath })
    }

    return fileDataArray
  },
  chooseAudioSource(nowPlayListPath = '') {
    const sourcePath = dialog.showOpenDialogSync({
      title: 'Choose Audio',
      filters: [
        { name: 'Audio', extensions: ['mp3'] }
      ],
      properties: ['openFile']
    })

    if (!sourcePath) {
      return null
    }

    const fileName = path.basename(sourcePath[0])
    const targetFolder = nowPlayListPath
    const targetPath = path.join(targetFolder, fileName)
    const relativePath = path.relative(targetFolder, targetPath)

    // 如果存在同名文件，删除它
    if (isDuplicateFile(targetFolder, targetPath)) {
      try {
        fs.unlinkSync(targetPath)
      } catch (err) {
        console.error(err)
        return null
      }
    }

    try {
      fs.copyFileSync(sourcePath[0], targetPath)
    } catch (err) {
      console.error(err)
      return null
    }

    const fileData = { fileName, targetPath, relativePath }
    return fileData
  },
  chooseBGSource(nowPlayListPath = '') {
    const sourcePath = dialog.showOpenDialogSync({
      title: 'Choose Media',
      filters: [
        { name: 'Images', extensions: ['jpg', 'jpeg', 'bmp', 'png'] }
      ],
      properties: ['openFile']
    })

    if (!sourcePath) {
      return null
    }

    const fileName = path.basename(sourcePath[0])
    const targetFolder = nowPlayListPath
    const targetPath = path.join(targetFolder, fileName)
    const relativePath = path.relative(targetFolder, targetPath)

    // 如果存在同名文件，删除它
    if (isDuplicateFile(targetFolder, targetPath)) {
      try {
        fs.unlinkSync(targetPath)
      } catch (err) {
        console.error(err)
        return null
      }
    }

    try {
      fs.copyFileSync(sourcePath[0], targetPath)
    } catch (err) {
      console.error(err)
      return null
    }

    const fileData = { fileName, targetPath, relativePath }
    return fileData
  },
  async getSingleFileData(fileData) {
    try {
      const stats = await fs.promises.stat(fileData.targetPath)
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
          case '.mp3':
            fileDataWithSize._type = 'audio'
            break
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
    } catch (err) {
      console.error(err)
      return null
    }
  },
  async getFileData(fileDatas) {
    const promises = fileDatas.map((fileData) => {
      console.log('fileData', fileData)
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
              case '.mp3':
                fileDataWithSize._type = 'audio'
                break
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

    try {
      const resolvedPromises = await Promise.all(promises)
      const validFileDatas = resolvedPromises.filter(fileData => fileData !== null)
      return validFileDatas
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  writeBGFile: (nowPlayListPath, file) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!nowPlayListPath || !file) {
        return reject('Invalid arguments')
      }

      try {
        // Add this line to delete existing files starting with 'background_color_'
        fs.readdirSync(nowPlayListPath)
          .filter(f => f.startsWith('background_color_'))
          .forEach(f => fs.unlinkSync(path.join(nowPlayListPath, f)))

        const targetPath = path.join(nowPlayListPath, file.name)
        const buffer = await file.arrayBuffer()

        // Use a Promise to wrap the fs.writeFile() function
        await new Promise((resolve, reject) => {
          fs.writeFile(targetPath, Buffer.from(buffer), (err) => {
            if (err) {
              reject(err)
            } else {
              console.log('The file has been saved!')
              resolve(true)
            }
          })
        })

        // If everything succeeded, resolve the outer promise
        resolve(true)
      } catch (error) {
        console.error(`Error writing file to ${nowPlayListPath}: ${error}`)
        reject(error)
      }
    })
  },
  removeBGFile: (nowPlayListPath) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        // Add this line to delete existing files starting with 'background_color_'
        fs.readdirSync(nowPlayListPath)
          .filter(f => f.startsWith('background_color_'))
          .forEach(f => fs.unlinkSync(path.join(nowPlayListPath, f)))
        resolve(true)
      } catch (error) {
        console.error(`Error writing file to ${nowPlayListPath}: ${error}`)
        reject(error)
      }
    })
  },
  delTempFolder: async (nowPlayListPath) => {
    if (nowPlayListPath && path.basename(nowPlayListPath).includes('@_Temp_Playlist_')) {
      try {
        await fs.rmdirSync(nowPlayListPath, { recursive: true })
        console.log(`${nowPlayListPath} 已被刪除`)
      } catch (error) {
        // console.error(`刪除 ${nowPlayListPath} 時發生錯誤：`, error)
      }
    }
  },
  delTempFolderWithClose: async (nowPlayListPath) => {
    if (nowPlayListPath && path.basename(nowPlayListPath).includes('@_Temp_Playlist_')) {
      try {
        await fs.rmdirSync(nowPlayListPath, { recursive: true })
        console.log(`${nowPlayListPath} 已被刪除`)
        closeWindow()
      } catch (error) {
        // console.error(`刪除 ${nowPlayListPath} 時發生錯誤：`, error)
      }
    }
    closeWindow()
  },
  deleteFile(nowPlayListPath = '', sourceFile) {
    if (nowPlayListPath) {
      const targetPath = path.join(nowPlayListPath, sourceFile)
      console.log('targetPath', targetPath)
      fs.unlinkSync(targetPath)
    }
  }
})
const writeAndCopyFolder = async (nowPlayListPath, newPlayListPath, xmlData) => {
  try {
    // 同樣資料夾則只寫入index.xml
    if (nowPlayListPath === newPlayListPath) {
      const indexFile = path.join(nowPlayListPath, 'index.xml')
      // 寫入檔案
      await fs.promises.writeFile(indexFile, xmlData)

      return Promise.resolve({
        targetFile: nowPlayListPath,
        xmlData
      })
    }

    // 不同資料夾則全複製
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
    // 於新資料夾寫入indexl.xml檔案
    const indexFile = path.join(newPlayListPath, 'index.xml')
    await fs.promises.writeFile(indexFile, xmlData)

    return {
      targetFile: newPlayListPath,
      xmlData
    }
  } catch (err) {
    console.error(`Error in writeAndCopyFolder: ${err.message}`)
    throw err
  }
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
// 取得USER資料夾並創建PlayList_yyyyMMddhhmmss
// const getSourceFolder = () => {
//   const NovoFolder = getNovoFolder()
//   const strftime = require('strftime')
//   const timestamp = strftime('%Y%m%d%H%M%S', new Date())
//   const newPlayListName = `PlayList_${timestamp}`
//   const SourceFolder = path.join(NovoFolder, newPlayListName)
//   if (!fs.existsSync(SourceFolder)) {
//     fs.mkdirSync(SourceFolder)
//   }

//   return SourceFolder
// }
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
  // console.log('folder', folder)
  return folder
}
// const focusWindow = () => {
//   // 取得當前的視窗對象
//   let window = BrowserWindow.getFocusedWindow()

//   // 如果目前沒有任何視窗被聚焦，則選擇第一個視窗
//   if (!window) {
//     window = BrowserWindow.getAllWindows()[0]
//   }

//   // 聚焦到該視窗
//   if (window) {
//     window.focus()
//   }
//   return window
// }
const closeWindow = () => {
  BrowserWindow.getFocusedWindow().close()
}
