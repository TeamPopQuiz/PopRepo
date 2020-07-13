import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_QUIZ = 'GET_QUIZ'
const GET_QUIZ_QUESTION = 'GET_QUIZ_QUESTION'

/**
 * INITIAL STATE
 */
let initialState = {quiz: {}, selectedQuestion: {}}

/**
 * ACTION CREATORS
 */
const gotQuiz = quiz => ({type: GET_QUIZ, quiz})
const gotQuizQuestion = selectedQuestion => ({
  type: GET_QUIZ_QUESTION,
  selectedQuestion
})

/**
 * THUNK CREATORS
 */
export const getQuizData = quizId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/quizzes/${quizId}`)
      dispatch(gotQuiz(data[0]))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getQuizQuestion = (questionId, quizId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/quizzes/${quizId}/questions/${questionId}`
      )
      dispatch(gotQuizQuestion(data[0]))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUIZ:
      return {...state, quiz: action.quiz}
    case GET_QUIZ_QUESTION:
      return {...state, selectedQuestion: action.selectedQuestion}
    default:
      return state
  }
}
