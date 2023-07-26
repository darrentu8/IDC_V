import { Notify } from 'quasar'
import { useWidgetListStore } from 'src/stores/widget'
export let webSocket = null

export const initWebSocket = (ws) => {
  const widgetStore = useWidgetListStore()

  webSocket = ws

  webSocket.onmessage = e => {
    let msg = e.data
    try {
      msg = JSON.parse(msg?.Command)
    } catch {
      msg = null
      return
    }
    console.log('msg', msg)
    if (msg.Command === 'OpenNew') {
      if (widgetStore.nowPlayListPath) {
        window.myAPI.delTempFolder(widgetStore.nowPlayListPath)
        widgetStore.ResetNovoDS()
      }
      widgetStore.SetOpenNewFileData(msg)
      this.$router.push({ path: '/' })
    } else if (msg.Command === 'Reload' && msg.Playlist && msg.PlaylistPath) {
      console.log('msg', msg)
      const targetFile = msg.PlaylistPath + msg.Playlist
      const result = window.myAPI?.transXml(targetFile)
      if (result) {
        console.log('result', result)
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

  webSocket.onclose = e => {
    console.log('WebSocket已關閉')

    Notify.create({
      timeout: 5000,
      message: 'Disconnected to NovoDS',
      position: 'bottom',
      type: 'negative'
    })
  }
}
