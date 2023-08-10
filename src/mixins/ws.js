// import { initWebSocket } from 'src/js/websocket'
// import { Notify } from 'quasar'
import { useWidgetListStore } from 'src/stores/widget'
// import { useRouter } from 'vue-router'
export const webSocket = null

export const mixinWebsocket = {
  data() {
    return {
      ws: null
    }
  },
  methods: {
    initWebsocket() {
      this.ws = new WebSocket('ws://localhost:6001')
      this.ws.onopen = this.websocketonopen
      this.ws.error = this.websocketonerror
      this.ws.onmessage = this.websocketonmessage
      this.ws.onclose = this.websocketclose
    },
    websocketonopen() {
      console.log('WebSocket連線成功')
      this.ws.send('Connected to NovoDS')
    },
    websocketonerror(e) {
      console.error('WebSocket連線失敗', e)
    },
    websocketonmessage(e) {
      const widgetStore = useWidgetListStore()
      console.log('Websocket msg', e.data)
      if (e !== undefined && e.data) {
        let msg = null
        try {
          msg = JSON.parse(e.data)
        } catch (error) {
          console.log('Websocket msg', msg)
        }
        if (msg != null && msg.Command === 'OpenNew') {
          if (widgetStore.nowPlayListPath) {
            window.myAPI.delTempFolder(widgetStore.nowPlayListPath)
            widgetStore.ResetNovoDS()
          }
          console.log('Open', msg)
          widgetStore.SetOpenNewFileData(msg)
          this.$router.push({ path: '/' })
        } else if (msg != null && msg.Command === 'Reload' && msg.Playlist && msg.PlaylistPath) {
          const targetFile = msg.PlaylistPath + '/' + msg.Playlist
          const result = window.myAPI?.transXml(targetFile)
          console.log('Reload', msg)
          if (result) {
            window.myAPI?.focusWindow()
            // console.log('result', result)
            if (widgetStore.nowPlayListPath) {
              window.myAPI.delTempFolder(widgetStore.nowPlayListPath)
            }
            widgetStore.SetNovoDS(msg, result).then((result) => {
              console.log('SetNovoDS', result)
              this.$router.push({ path: '/flow' })
              const dialog = this.$q.dialog({
                title: widgetStore.NovoDS._Playlist_Name + ' ' + 'opening...',
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
      }
    },
    websocketsend(data) {
      // 前端丟資料
      console.log('send data', data)
      this.ws.send(data)
    },
    websocketclose() {

    }
  }
}
