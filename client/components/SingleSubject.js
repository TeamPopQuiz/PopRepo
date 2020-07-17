import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedSubject} from '../store/subject'
// import {getQuestion} from '../store/activeQuiz'
import {Link} from 'react-router-dom'

class SingleSubject extends Component {
  componentDidMount() {
    this.props.fetchSelectedSubject(this.props.match.params.id)
  }

  render() {
    const {subject} = this.props
    const quizzes = subject.ticketTemplates
    return (
      <div>
        <div className="teacherSingle">
          <h1>{subject.name}</h1>
        </div>
        <div className="teacherSingle">
          <h3>Room code: {subject.roomCode}</h3>
          <Link to="/createquiz">
            <button type="button">Create Quiz</button>
          </Link>
        </div>
        {quizzes ? (
          <div className="teacherSingle">
            <h2>Past Quizzes:</h2>
            <h3>
              {quizzes.map(currQuiz => (
                <p key={currQuiz.id}>
                  <Link to={`/quizzes/${currQuiz.id}`}>
                    {currQuiz.quizName}
                  </Link>
                </p>
              ))}
            </h3>
          </div>
        ) : (
          <h1>No past quizzes!</h1>
        )}
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
