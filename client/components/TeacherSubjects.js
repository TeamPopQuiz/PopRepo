import React from 'react'
import {connect} from 'react-redux'
import AddRoom from './AddRoom'
import {getSubjects} from '../store/subject'
import {Link} from 'react-router-dom'

class TeacherSubjects extends React.Component {
  componentDidMount() {
    this.props.getRooms()
  }

  render() {
    console.log('this.props.subjects', this.props.subjects)
    return (
      <div>
        <h1>My Subjects</h1>
        <AddRoom />
        <h2>Existing subjects</h2>
        <ul>
          {this.props.subjects && this.props.subjects.length ? (
            this.props.subjects.map(subject => {
              return (
                <li key={subject.id}>
                  <Link to={`/subjects/${subject.id}`}>
                    {subject.name} {subject.roomCode}
                  </Link>
                </li>
              )
            })
          ) : (
            <li>No Subjects</li>
          )}
        </ul>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getRooms: () => dispatch(getSubjects())
  }
}

const mapState = state => {
  return {
    subjects: state.subjects.subjects
  }
}

export default connect(mapState, mapDispatch)(TeacherSubjects)
