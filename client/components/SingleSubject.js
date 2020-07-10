import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedSubject} from '../store/subject'
import {Link} from 'react-router-dom'

class SingleSubject extends Component {
  componentDidMount() {
    this.props.fetchSelectedSubject(this.props.match.params.id)
  }

  render() {
    const {subject} = this.props
    return (
      <div>
        <h1>{subject.name}</h1>
        <h3>Room code: {subject.roomCode}</h3>
        <Link to="/createquiz">
          <button type="button">Create Quiz</button>
        </Link>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedSubject: id => dispatch(getSelectedSubject(id))
  }
}

const mapState = state => {
  return {
    subject: state.subjects.selectedSubject
  }
}

export default connect(mapState, mapDispatch)(SingleSubject)
