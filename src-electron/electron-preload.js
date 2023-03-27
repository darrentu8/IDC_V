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
const { contextBridge } = require('electron')
import path from 'path'
import fs from 'fs'
import xml2js from 'xml2js'

contextBridge.exposeInMainWorld('myAPI', {
    loadFileTest: () => {
        const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER, 'test.json')

        return fs.readFileSync(publicFolder, 'utf8')
    },
    exportXmlFile: (data) => {
        const builder = new xml2js.Builder()
        const xml = builder.buildObject(data)

        const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER, 'test.xml')
        fs.writeFileSync(publicFolder, xml)

        return xml
    }
})
