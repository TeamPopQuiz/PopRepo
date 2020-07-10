import axios from 'axios'

//action types
const CREATE_QUIZ = 'CREATE_QUIZ'
const ADD_QUESTION = 'ADD_QUESTION'
const DELETE_QUESTION = 'DELETE_QUESTION'
const SUBMIT_QUIZ = 'SUBMIT_QUIZ'

//action creators
export const createQuiz = quiz => ({
  type: CREATE_QUIZ,
  quiz
})

export const addQuestion = qAndA => ({
  type: ADD_QUESTION,
  qAndA
})

export const deleteQuestion = qId => ({
  type: DELETE_QUESTION,
  qId
})

export const submitQuiz = () => ({
  type: SUBMIT_QUIZ
})

//thunk
export const createdQuiz = quiz => {
  return async dispatch => {
    try {
      console.log('inside thunk')
      const {data} = await axios.post('/api/quizzes/createQuiz', quiz)
      console.log('after axios request')
      dispatch(createQuiz(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addedQuestion = qAndA => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/quizzes/addQuestion', qAndA)
      dispatch(addQuestion(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const submittedQuiz = () => {
  return dispatch => {
    try {
      dispatch(submitQuiz())
    } catch (error) {
      console.error(error)
    }
  }
}

let initialState = {quiz: {}, questions: []}
//reducer
export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ:
      return {...state, quiz: action.quiz}
    case ADD_QUESTION:
      return {...state, questions: [...state.questions, action.qAndA]}
    case SUBMIT_QUIZ:
      return {...initialState}
    default:
      return state
  }
}
