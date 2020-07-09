import axios from 'axios'

const GET_SUBJECTS = 'GET_SUBJECTS'

//default
const defaultSubject = []

//action creators
const gotSubjects = subjects => ({type: GET_SUBJECTS, subjects})

//thunk creators
export const getSubjects = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/subjects')
      dispatch(gotSubjects(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//reducer
export default function(state = defaultSubject, action) {
  switch (action.type) {
    case GET_SUBJECTS:
      return action.subjects
    default:
      return state
  }
}
