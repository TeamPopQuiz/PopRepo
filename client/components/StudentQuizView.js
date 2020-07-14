import React from 'react'
import {connect} from 'react-redux'
import {
  updateQuiz,
  submitAnswer,
  resetActiveQuestion
} from '../store/activeQuiz'
import {Link} from 'react-router-dom'

class StudentQuizView extends React.Component {
  constructor() {
    super()
    this.giveAnswer = this.giveAnswer.bind(this)
    this.reset = this.reset.bind(this)
  }

  giveAnswer(e) {
    this.props.sendAnswer(
      this.props.student.id,
      this.props.question.id,
      e.target.value
    )
  }

  reset() {
    this.props.resetActiveQuizState()
  }

  render() {
    let {question, rightA, wrongA1, wrongA2, wrongA3} = this.props.question
    return this.props.question.noMoreQuestions ? (
      <div>
        <h2>Congrats! You finished your MindPop!</h2>
        <Link to="/home">
          <button type="button" onClick={this.reset}>
            Go To Home
          </button>
        </Link>
      </div>
    ) : !this.props.question.id ? (
      <div>Please Wait, Quiz Will Start Soon</div>
    ) : (
      <div>
        <ul>
          <li>{question}</li>
          <div>
            <button type="button" value={rightA} onClick={this.giveAnswer}>
              {rightA}
            </button>
            <button type="button" value={wrongA1} onClick={this.giveAnswer}>
              {wrongA1}
            </button>
          </div>
          <div>
            <button type="button" value={wrongA2} onClick={this.giveAnswer}>
              {wrongA2}
            </button>
            <button type="button" value={wrongA3} onClick={this.giveAnswer}>
              {wrongA3}
            </button>
          </div>
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    question: state.activeQuiz,
    student: state.user.student
  }
}

const mapDispatch = dispatch => {
  return {
    update: () => dispatch(updateQuiz()),
    sendAnswer: (studentId, questionId, answer) =>
      dispatch(submitAnswer(studentId, questionId, answer)),
    resetActiveQuizState: () => dispatch(resetActiveQuestion())
  }
}

export default connect(mapState, mapDispatch)(StudentQuizView)
