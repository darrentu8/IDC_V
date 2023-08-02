import { Notify } from 'quasar'
export let webSocket = null
export const initWebSocket = (ws) => {
  webSocket = ws
  webSocket.onmessage = e => {
    const msg = e.data
    console.log('msg', msg)
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
