import io from 'socket.io-client'
import {gotQuestion} from './store/activeQuiz'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('new question', data => {
    store.dispatch(gotQuestion(data))
  })
})

export default socket
