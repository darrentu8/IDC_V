<template>
  <q-ajax-bar position="top" color="primary" size="7px" />
  <router-view />
  <!-- <ConfirmDialog /> -->
</template>

<script>
// import X2js from 'x2js'
// import ConfirmDialog from 'src/components/dialog/ConfirmDialog.vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
import { defineComponent } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const widgetStore = useWidgetListStore()

    async function loadConfigData() {
      const loadConfigData = await window.myAPI?.loadConfigFile()
      if (loadConfigData !== null) {
        if (loadConfigData.openType === 'new') {
          console.log('new')
          widgetStore.SetOpenNewFileData(loadConfigData.propFileData)
          router.push({ path: '/' })
        } else if (loadConfigData.openType === 'load') {
          widgetStore.SetNovoDS(loadConfigData.propFileData, loadConfigData.result)
          router.push({ path: '/flow' })
        } else {
          console.log(loadConfigData)
          $q.dialog({
            title: 'File format error',
            okBtn: 'ok'
          }).onOk(() => {
          }).onCancel(() => {
            console.log('Cancel')
          }).onDismiss(() => {
            console.log('Called on OK or Cancel')
          })
        }
      }
    }
    let watchJsonPromise // 定義一個變數來存放 Promise 物件

    // 啟動監聽
    function startWatching() {
      watchJsonPromise = window.myAPI.watchJson().then((loadConfigData) => {
        console.log('Received data:', loadConfigData)
        if (loadConfigData !== null) {
          if (loadConfigData.openType === 'new') {
            console.log('Reopen new')
            window.myAPI.delTempFolder(widgetStore.nowPlayListPath)
            widgetStore.resetNovoDS()
            widgetStore.SetOpenNewFileData(loadConfigData.propFileData).then((result) => {
              console.log('SetOpenNewFileData', result)
              router.push({ path: '/' })
            })
          } else if (loadConfigData.openType === 'load') {
            console.log('Reopen load')
            window.myAPI.delTempFolder(widgetStore.nowPlayListPath)
            widgetStore.SetNovoDS(loadConfigData.propFileData, loadConfigData.result).then((result) => {
              console.log('SetNovoDS', result)
              router.push({ path: '/flow' })
              $q.dialog({
                title: 'PlayList File successfully opened!'
              }).onOk(() => {
              }).onCancel(() => {
                console.log('Cancel')
              }).onDismiss(() => {
                console.log('Called on OK or Cancel')
              })
            })
          }
        }
        stopWatching()
        startWatching()
      }).catch((error) => {
        console.error('Error:', error)
        // 然後重新啟動監聽
        startWatching()
      })
    }

    // function saveAlert() {
    //   return new Promise((resolve, reject) => { // 返回 Promise 對象
    //     const saveAlert = $q.dialog({
    //       component: ConfirmDialog,
    //       componentProps: {
    //         title: 'Do you want to save before leaving?',
    //         message: '',
    //         okBtn: 'Yes, save',
    //         cancelBtn: 'No'
    //       }
    //     }).onOk(() => {
    //       const result = saveFile()
    //       if (result) {
    //         console.log('result', result)
    //         resolve(result) // 在這裡 resolve Promise 對象
    //       }
    //       saveAlert.hide()
    //     }).onCancel(() => {
    //       console.log('Cancel')
    //       reject(false) // 在這裡 reject Promise 對象
    //     })
    //   })
    // }

    // function saveFile() {
    //   const x2js = new X2js({ attributePrefix: '_' })
    //   const novoObj = { NovoDS: widgetStore.NovoDS }
    //   const xmlData = x2js.js2xml(novoObj)
    //   const result = window.myAPI.storeToXML(widgetStore.NovoDS._Playlist_Name, widgetStore.nowPlayListFolder, widgetStore.nowPlayListPath, xmlData)
    //   if (result) {
    //     $q.dialog({
    //       title: 'Saved successfully!'
    //     })
    //   }
    // }

    // 停止監聽
    function stopWatching() {
      if (watchJsonPromise) {
        watchJsonPromise.catch(() => { }) // 必須攔截 Promise 的錯誤，否則可能會產生 unhandled promise rejection 警告
        watchJsonPromise = null
      }
    }

    // 開始監聽
    startWatching()

    // 5 秒後停止監聽
    // setTimeout(stopWatching, 5000)

    // async function watchJson() {
    //   const loadConfigData = await window.myAPI?.watchJson()
    //   if (loadConfigData !== null) {
    //     if (loadConfigData.openType === 'new') {
    //       console.log('new')
    //       widgetStore.SetOpenNewFileData(loadConfigData.propFileData).then((result) => {
    //         console.log('SetOpenNewFileData', result)
    //         router.push({ path: '/' })
    //       })
    //       router.push({ path: '/' })
    //     } else if (loadConfigData.openType === 'load') {
    //       console.log('load')
    //       widgetStore.SetNovoDS(loadConfigData.propFileData, loadConfigData.result).then((result) => {
    //         console.log('SetNovoDS', result)
    //         router.push({ path: '/flow' })
    //       })
    //     } else {
    //       console.log(loadConfigData)
    //       $q.dialog({
    //         title: 'File format error',
    //         okBtn: 'ok'
    //       }).onOk(() => {
    //       }).onCancel(() => {
    //         console.log('Cancel')
    //       }).onDismiss(() => {
    //         console.log('Called on OK or Cancel')
    //       })
    //     }
    //   } else {
    //     console.log(loadConfigData)
    //     $q.dialog({
    //       title: 'File format error',
    //       okBtn: 'ok'
    //     }).onOk(() => {
    //     }).onCancel(() => {
    //       console.log('Cancel')
    //     }).onDismiss(() => {
    //       console.log('Called on OK or Cancel')
    //     })
    //   }
    // }
    return { loadConfigData, startWatching }
  },
  async mounted() {
    try {
      await new Promise((resolve, reject) => {
        window.myAPI?.checkJson().then(() => {
          console.log('interactive.json is ready')
          resolve()
        }).catch((err) => {
          console.error(`Failed to create interactive.json: ${err}`)
          reject(err)
        })
      })
      await this.loadConfigData()
      await this.startWatching()
    } catch (err) {
      console.error(err)
    }
  },
  methods: {

  }
})
</script>
