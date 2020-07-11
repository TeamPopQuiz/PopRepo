import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_QUIZ = 'GET_QUIZ'

/**
 * INITIAL STATE
 */
let initialState = {quiz: {}}

/**
 * ACTION CREATORS
 */
const gotQuiz = quiz => ({type: GET_QUIZ, quiz})

/**
 * THUNK CREATORS
 */
export const getQuizData = quizId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/quizTemplates/${quizId}`)
      dispatch(gotQuiz(data[0]))
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
    default:
      return state
  }
}
