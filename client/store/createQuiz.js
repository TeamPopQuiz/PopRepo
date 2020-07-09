import axios from 'axios'

//action types
const CREATE_QUIZ = 'CREATE_QUIZ'

//action creators
export const createQuiz = quiz => ({
  type: CREATE_QUIZ,
  quiz
})

//thunk
export const createdQuiz = quiz => {
  return async dispatch => {
    try {
      console.log('before axios')
      const {data} = await axios.post('/api/quizzes/createQuiz', quiz)
      console.log('this is the data', data)
      dispatch(createQuiz(data))
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
    default:
      return state
  }
}
