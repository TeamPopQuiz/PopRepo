import axios from 'axios'

const GET_STUDENTS = 'GET_STUDENTS'

const defaultStudents = []

//action creators
const gotStudents = students => ({type: GET_STUDENTS, students})

//thunk creators
export const getStudents = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/students')
      dispatch(gotStudents(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//reducer
export default function(state = defaultStudents, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students
    default:
      return state
  }
}
