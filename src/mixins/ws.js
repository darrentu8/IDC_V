import { initWebSocket } from 'src/js/websocket'
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
      initWebSocket(this.ws)
    },
    websocketonopen() {
      console.log('WebSocket連線成功')
    },
    websocketonerror(e) {
      console.error('WebSocket連線失敗', e)
    },
    websocketonmessage(e) {

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
