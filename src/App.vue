<template>
  <q-ajax-bar position="top" color="primary" size="7px" />
  <router-view />
  <!-- <ConfirmDialog /> -->
</template>

<script>
// import X2js from 'x2js'
// import ConfirmDialog from 'src/components/dialog/ConfirmDialog.vue'
import io from 'socket.io-client'
import { ref, defineComponent } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
export default defineComponent({
  name: 'App',
  setup() {
    const widgetStore = useWidgetListStore()
    const socket = ref({})

    return {
      socket,
      widgetStore
    }
  },
  created() {
  },
  async mounted() {
    this.socket = io('ws://localhost:6001')
    this.sendMessage()
    this.socket.on('connect', function () {
      console.log('Your socket is connected!')
    })
    this.socket.on('message', (message) => {
      const msg = message
      // if (typeof message === 'string') {
      //   msg = JSON.parse(message)
      // }
      if (msg.Command === 'OpenNew') {
        console.log('msg', msg)
        if (this.widgetStore.nowPlayListPath) {
          window.myAPI.delTempFolder(this.widgetStore.nowPlayListPath)
          this.widgetStore.ResetNovoDS()
        }
        this.widgetStore.SetOpenNewFileData(msg)
        this.$router.push({ path: '/' })
      } else if (msg.Command === 'Reload' && msg.Playlist && msg.PlaylistPath) {
        console.log('msg', msg)
        const targetFile = msg.PlaylistPath + msg.Playlist
        const result = window.myAPI?.transXml(targetFile)
        if (result) {
          console.log('result', result)
          if (this.widgetStore.nowPlayListPath) {
            window.myAPI.delTempFolder(this.widgetStore.nowPlayListPath)
          }
          this.widgetStore.SetNovoDS(msg, result).then((result) => {
            console.log('SetNovoDS', result)
            this.$router.push({ path: '/flow' })
            const dialog = this.$q.dialog({
              title: this.widgetStore.NovoDS._Playlist_Name + ' ' + 'opening...',
              message: 'Processing... 0%',
              progress: true, // we enable default settings
              persistent: false, // we want the user to not be able to close it
              ok: false // we want the user to not be able to close it
            })

            // we simulate some progress here...
            let percentage = 0
            const interval = setInterval(() => {
              percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

              // we update the dialog
              dialog.update({
                message: `Processing... ${percentage}%`
              })

              // if we are done, we're gonna close it
              if (percentage === 100) {
                clearInterval(interval)
                setTimeout(() => {
                  dialog.hide()
                }, 150)
              }
            }, 100)
          })
        }
      }
      console.log('msg', msg)
    })
  },
  methods: {
    sendMessage() {
      this.socket.emit('message', {
        text: 'Interactive Playlist Editor Connected!'
      })
    }
  }
})
</script>
<style></style>
