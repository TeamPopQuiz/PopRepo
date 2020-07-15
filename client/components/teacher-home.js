import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getStudents} from '../store/students'

class TeacherHome extends React.Component {
  componentDidMount() {
    try {
      this.props.getAllStudents()
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    const {students} = this.props
    return (
      <div className="teacherhome">
        <div>
          <Link to="/all-subjects">
            <button type="button">VIEW CLASSROOMS</button>
          </Link>
          <Link to="/classrooms/create">
            <button type="button">CREATE CLASSROOM</button>
          </Link>
        </div>
        <div>
          <Link to="/students">
            <button type="button">EDIT STUDENTS</button>
          </Link>
          <Link to="/classrooms/data">
            <button type="button">CLASS DATA</button>
          </Link>
        </div>
        <div className="roster">
          <p>Student Roster</p>
          <ul>
            {students.length > 0 ? (
              students.map(student => {
                return (
                  <li key={student.id} className="student">
                    {student.firstName} {student.lastName}
                  </li>
                )
              })
            ) : (
              <li>No Students</li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    students: state.students
  }
}

const mapDispatch = dispatch => {
  return {
    getAllStudents: () => dispatch(getStudents())
  }
}

export default connect(mapState, mapDispatch)(TeacherHome)
