import io from 'socket.io-client'

if (typeof window === 'undefined') {
  global.window = {}
}

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
