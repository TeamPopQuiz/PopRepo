import axios from 'axios'
import socket from '../socket'

const initialState = {}

const GET_QUESTION = 'GET_QUESTION'
const UDPATE_QUIZ = 'UDPATE_QUIZ'
const RESET = 'RESET'
const LINK_QUIZ = 'LINK_QUIZ'

export const updatedQuiz = val => ({type: UDPATE_QUIZ, val})
export const gotQuestion = question => ({type: GET_QUESTION, question})
export const resetActiveQuestion = () => ({type: RESET})

export const getQuestion = ticketId => {
  return async dispatch => {
    try {
      let {data} = await axios.put('/api/quizzes/active-ticket-questions', {
        ticketId
      })
      if (!data) {
        data = {}
        data.noMoreQuestions = true
      } else {
        await axios.put('/api/quizzes/finished-question', data)
      }
      dispatch(gotQuestion(data))
      socket.emit('new question', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const submitAnswer = (studentId, questionId, answer) => {
  return async () => {
    try {
      await axios.post('/api/quizzes/submit-answer', {
        studentId,
        questionId,
        answer
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const linkQuiz = (quizCode, studentId) => {
  return async () => {
    try {
      await axios.put('/api/quizzes/link-to-quiz', {quizCode, studentId})
    } catch (error) {
      console.error(error)
    }
  }
}

//thunk not being used, may be able to remove at some point
export const updateQuiz = () => {
  return dispatch => {
    setInterval(() => {
      let rand = Math.floor(Math.random() * 100)
      dispatch(updatedQuiz(rand))
      socket.emit('sending rand number', rand)
    }, 2000)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION:
      return action.question
    case UDPATE_QUIZ:
      return action.val
    case RESET:
      return initialState
    default:
      return state
  }
}
