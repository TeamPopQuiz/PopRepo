import axios from 'axios'

//action types
const CREATE_QUIZ = 'CREATE_QUIZ'
const ADD_QUESTION = 'ADD_QUESTION'

//action creators
export const createQuiz = quiz => ({
  type: CREATE_QUIZ,
  quiz
})

export const addQuestion = qAndA => ({
  type: ADD_QUESTION,
  qAndA
})

//thunk
export const createdQuiz = quiz => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/quizzes/createQuiz', quiz)
      dispatch(createQuiz(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addedQuestion = qAndA => {
  return async dispatch => {
    try {
      await axios.post('/api/quizzes/addQuestion', qAndA)
      dispatch(addQuestion(qAndA))
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
    default:
      return state
  }
}
