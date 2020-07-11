import io from 'socket.io-client'
import {updatedQuiz, gotQuestion} from './store/activeQuiz'
import store from './store'

const socket = io(window.location.origin)
// const socket = io('http://localhost:8080/quiz')

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('new question', data => {
    store.dispatch(gotQuestion(data))
    console.log(data)
  })
})

export default socket
