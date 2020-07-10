import io from 'socket.io-client'

let module = window

// Wrap the require in check for window
if (typeof window !== `undefined`) {
  module = require('module')
}
const socket = io(module.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
