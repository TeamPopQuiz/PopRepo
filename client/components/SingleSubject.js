import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedSubject} from '../store/subject'
import {getQuestion} from '../store/activeQuiz'
import {Link} from 'react-router-dom'

class SingleSubject extends Component {
  constructor() {
    super()

    this.launchQuiz = this.launchQuiz.bind(this)
  }

  componentDidMount() {
    this.props.fetchSelectedSubject(this.props.match.params.id)
  }

  launchQuiz() {
    this.props.newQuestion(1)
  }

  render() {
    const {subject} = this.props
    const quizzes = subject.ticketTemplates
    return (
      <div>
        <h1>{subject.name}</h1>
        <h3>Room code: {subject.roomCode}</h3>
        <Link to="/createquiz">
          <button type="button">Create Quiz</button>
        </Link>
        <button type="button" onClick={this.launchQuiz}>
          Launch Quiz
        </button>
        {quizzes ? (
          <div>
            <h2>Past Quizzes:</h2>
            <h3>
              {quizzes.map(currQuiz => (
                <li key={currQuiz.id}>
                  <Link to={`/quizzes/${currQuiz.id}`}>
                    {currQuiz.quizName}
                  </Link>
                </li>
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
    fetchSelectedSubject: id => dispatch(getSelectedSubject(id)),
    newQuestion: quizId => dispatch(getQuestion(quizId))
  }
}

const mapState = state => {
  return {
    subject: state.subjects.selectedSubject
  }
}

export default connect(mapState, mapDispatch)(SingleSubject)
