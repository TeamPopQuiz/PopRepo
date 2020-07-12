import axios from 'axios'

//action types
const CREATE_QUIZ = 'CREATE_QUIZ'
const ADD_QUESTION = 'ADD_QUESTION'
const DELETE_QUESTION = 'DELETE_QUESTION'
const SUBMIT_QUIZ = 'SUBMIT_QUIZ'
const REMOVE_QUIZ = 'REMOVE_QUIZ'

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

export const removeQuiz = () => ({
  type: REMOVE_QUIZ
})

//thunk
export const createdQuiz = (quiz, subjectId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/quizzes/createQuiz', {
        quiz,
        subjectId
      })
      dispatch(createQuiz(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addedQuestion = (qAndA, ttId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/quizzes/addQuestion', {qAndA, ttId})
      dispatch(addQuestion(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deletedQuestion = id => {
  console.log('inside deletedq thunk, questionId:', id)
  return async dispatch => {
    try {
      console.log('before axios delete')
      await axios.delete('/api/quizzes/deleteQuestion', {data: {id}})
      console.log('after axios delete')
      dispatch(deleteQuestion(id))
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

export const removedQuiz = () => {
  return dispatch => {
    try {
      dispatch(removeQuiz())
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
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.qId)
      }
    case SUBMIT_QUIZ:
      return {...initialState}
    case REMOVE_QUIZ:
      return {...initialState}
    default:
      return state
  }
}
