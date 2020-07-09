import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_QUIZ = 'GET_QUIZ'

/**
 * INITIAL STATE
 */
const defaultQuiz = {
  quiz: '',
  questions: []
}

/**
 * ACTION CREATORS
 */
const getQuiz = (quiz, questions) => ({type: GET_QUIZ, quiz, questions})

/**
 * THUNK CREATORS
 */
export const getQuizData = quizId => async dispatch => {
  try {
    const res = await axios.get(`/quizTemplates/:${quizId}`)
    console.log(res)
    dispatch(getQuiz(res.data.quiz, res.data.questions))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultQuiz, action) {
  switch (action.type) {
    case GET_QUIZ:
      return {...state, quiz: action.quiz, questions: action.questions}
    default:
      return state
  }
}
