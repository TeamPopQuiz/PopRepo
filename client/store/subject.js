import axios from 'axios'

const GET_SUBJECTS = 'GET_SUBJECTS'
const ADD_SUBJECT = 'ADD_SUBJECT'
const SELECTED_SUBJECT = 'SELECTED_SUBJECT'

//action creators
const gotSubjects = subjects => ({type: GET_SUBJECTS, subjects})
const addedSubject = newSubjects => ({type: ADD_SUBJECT, newSubjects})
const selectedSubject = subject => ({type: SELECTED_SUBJECT, subject})

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

export const getSelectedSubject = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/subjects/${id}`)
      console.log('data', data[0])
      dispatch(selectedSubject(data[0]))
    } catch (error) {
      console.error(error)
    }
  }
}

//default
let initialState = {subjects: [], selectedSubject: {}}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECTS:
      return {...state, subjects: [...action.subjects]}
    case ADD_SUBJECT:
      return {...state, subjects: [...action.newSubjects]}
    case SELECTED_SUBJECT:
      return {...state, selectedSubject: action.subject}
    default:
      return state
  }
}
