import axios from 'axios'

const GET_SUBJECTS = 'GET_SUBJECTS'
const ADD_SUBJECT = 'ADD_SUBJECT'

//default
const defaultSubject = []

//action creators
const gotSubjects = subjects => ({type: GET_SUBJECTS, subjects})
const addedSubject = newSubjects => ({type: ADD_SUBJECT, newSubjects})

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

export const addSubject = newSubjObj => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/subjects', newSubjObj)
      dispatch(addedSubject(data))
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
    case ADD_SUBJECT:
      return action.newSubjects
    default:
      return state
  }
}
