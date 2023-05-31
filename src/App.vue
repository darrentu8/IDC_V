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
      try {
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
      } catch (error) {
        console.error(error)
      }
    }

    let watchJsonPromise = null // 定義一個變數來存放 Promise 物件

    // 啟動監聽
    function startWatching() {
      if (watchJsonPromise) {
        console.log('Watch is already running')
        return
      }
      watchJsonPromise = window.myAPI.watchJson().then((loadConfigData) => {
        console.log('Received data:', loadConfigData)
        if (loadConfigData !== null) {
          if (loadConfigData.openType === 'new') {
            console.log('Reopen new')
            window.myAPI.delTempFolder(widgetStore.nowPlayListPath)
            widgetStore.ResetNovoDS()
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
              })
            })
          }
        }

        // 然後重新啟動監聽
        watchJsonPromise = null // 清除 Promise 物件
        startWatching()
      }).catch((error) => {
        console.log('Error:', error)

        // 然後重新啟動監聽
        watchJsonPromise = null // 清除 Promise 物件
        startWatching()
      })
    }

    // 開始監聽
    startWatching()
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
<style></style>
