<template>
  <router-view />
</template>

<script>
import useQuasar from 'quasar/src/composables/use-quasar.js'
import { defineComponent } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    async function startWatchJson() {
      const widgetStore = useWidgetListStore()
      const loadData = await window.myAPI?.loadFile()
      if (loadData.openType === 'focus') {
        console.log('focus')
      }
      if (loadData.openType === 'new') {
        console.log('new')
        widgetStore.SetOpenNewFileData(loadData.propFileData)
        window.myAPI?.watchJson()
      } else if (loadData.openType === 'load') {
        widgetStore.SetNovoDS(loadData.propFileData, loadData.result)
        window.myAPI?.watchJson()
        router.push({ path: '/flow' })
      } else {
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
    return { startWatchJson }
  },
  mounted() {
    this.startWatchJson()
  }
})
</script>
