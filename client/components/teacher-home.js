import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getStudents} from '../store/students'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

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
        <Container>
          <Row>
            <Link to="/all-subjects">
              <button type="button">VIEW CLASSROOMS</button>
            </Link>
            <Link to="/classrooms/create">
              <button type="button">CREATE CLASSROOM</button>
            </Link>
          </Row>
          <Row>
            <Link to="/students">
              <button type="button">EDIT STUDENTS</button>
            </Link>
            <Link to="/classrooms/data">
              <button type="button">CLASS DATA</button>
            </Link>
          </Row>
        </Container>
        <Container>
          <div className="roster">
            <h3>Student Roster</h3>
            {students.length > 0 ? (
              students.map(student => {
                return (
                  <p key={student.id} className="student">
                    {student.firstName} {student.lastName}
                  </p>
                )
              })
            ) : (
              <h3>No Students</h3>
            )}
          </div>
        </Container>
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
