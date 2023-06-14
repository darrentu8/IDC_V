import io from 'socket.io-client'
const socket = io.connect('ws://localhost:6001')
export default ({ Vue }) => {
  Vue.prototype.$socket = socket
}
export { socket }
