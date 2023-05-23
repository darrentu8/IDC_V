<template>
  <router-view />
</template>

<script>
// import useQuasar from 'quasar/src/composables/use-quasar.js'
import { defineComponent } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    // const $q = useQuasar()
    const router = useRouter()
    async function startWatchJson() {
      const widgetStore = useWidgetListStore()
      const loadConfigData = await window.myAPI?.loadConfigFile()
      if (loadConfigData !== null) {
        if (loadConfigData.openType === 'new') {
          console.log('new')
          widgetStore.SetOpenNewFileData(loadConfigData.propFileData)
          window.myAPI?.closeWatchJson()
          window.myAPI?.watchJson()
          router.push({ path: '/' })
        } else if (loadConfigData.openType === 'load') {
          widgetStore.SetNovoDS(loadConfigData.propFileData, loadConfigData.result)
          window.myAPI?.closeWatchJson()
          window.myAPI?.watchJson()
          router.push({ path: '/flow' })
        } else {
          console.log(loadConfigData)
          // $q.dialog({
          //   title: 'File format error',
          //   okBtn: 'ok'
          // }).onOk(() => {
          // }).onCancel(() => {
          //   console.log('Cancel')
          // }).onDismiss(() => {
          //   console.log('Called on OK or Cancel')
          // })
        }
      }
    }
    return { startWatchJson }
  },
  mounted() {
    window.myAPI?.checkJson()
    this.startWatchJson()
  }
})
</script>
