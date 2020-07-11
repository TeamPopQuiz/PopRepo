import axios from 'axios'
import socket from '../socket'

const GET_QUESTION = 'GET_QUESTION'
const UDPATE_QUIZ = 'UDPATE_QUIZ'

export const updatedQuiz = val => ({type: UDPATE_QUIZ, val})
export const gotQuestion = question => ({type: GET_QUESTION, question})

export const getQuestion = ticketId => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/quizzes/active-ticket-questions', {
        ticketId
      })
      // dispatch(gotQuestion(data))
      await axios.put('/api/quizzes/finished-question', data)
      socket.emit('new question', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateQuiz = () => {
  return dispatch => {
    setInterval(() => {
      let rand = Math.floor(Math.random() * 100)
      dispatch(updatedQuiz(rand))
      socket.emit('sending rand number', rand)
    }, 2000)
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_QUESTION:
      return action.question
    case UDPATE_QUIZ:
      return action.val
    default:
      return state
  }
}
