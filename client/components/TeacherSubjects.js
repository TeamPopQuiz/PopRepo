import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import AddRoom from './AddRoom'
import {getSubjects} from '../store/subject'

const TeacherSubjects = props => {
  useEffect(() => {
    props.getRooms()
  })
  return (
    <div>
      <h1>My Subjects</h1>
      <AddRoom />
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    getRooms: () => dispatch(getSubjects())
  }
}

export default connect(null, mapDispatch)(TeacherSubjects)
