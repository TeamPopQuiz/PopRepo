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

    this.state = {
      buttonDisabled: false
    }

    this.giveAnswer = this.giveAnswer.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if (prevProps.question.id !== this.props.question.id) {
      this.setState({
        buttonDisabled: false
      })
    }
  }

  giveAnswer(e) {
    this.props.sendAnswer(
      this.props.student.id,
      this.props.question.id,
      e.target.value
    )
    this.setState({
      buttonDisabled: true
    })
  }

  reset() {
    this.props.resetActiveQuizState()
  }

  render() {
    let {question, rightA, wrongA1, wrongA2, wrongA3} = this.props.question
    let answerArr = shuffle([rightA, wrongA1, wrongA2, wrongA3])
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
            <button
              type="button"
              value={answerArr[0]}
              onClick={this.giveAnswer}
              disabled={this.state.buttonDisabled}
            >
              {answerArr[0]}
            </button>
            <button
              type="button"
              value={answerArr[1]}
              onClick={this.giveAnswer}
              disabled={this.state.buttonDisabled}
            >
              {answerArr[1]}
            </button>
          </div>
          <div>
            <button
              type="button"
              value={answerArr[2]}
              onClick={this.giveAnswer}
              disabled={this.state.buttonDisabled}
            >
              {answerArr[2]}
            </button>
            <button
              type="button"
              value={answerArr[3]}
              onClick={this.giveAnswer}
              disabled={this.state.buttonDisabled}
            >
              {answerArr[3]}
            </button>
          </div>
        </ul>
      </div>
    )
  }
}

function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
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
