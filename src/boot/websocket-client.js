import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')
export default ({ Vue }) => {
  Vue.prototype.$socket = socket
}
export { socket }
