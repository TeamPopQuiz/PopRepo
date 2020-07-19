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
      questionAnswered: false,
      studentAnswer: ''
    }

    this.giveAnswer = this.giveAnswer.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.question.id !== this.props.question.id) {
      this.setState({
        questionAnswered: false
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
      questionAnswered: true,
      studentAnswer: e.target.value
    })
  }

  reset() {
    this.props.resetActiveQuizState()
  }

  render() {
    let {question, rightA, wrongA1, wrongA2, wrongA3} = this.props.question
    let answerArr = shuffle([rightA, wrongA1, wrongA2, wrongA3])
    if (this.state.questionAnswered) {
      return (
        <div className="s-quiz-view-div">
          <div className="quiz-question">{question}</div>
          <h2 id="you-answered">
            You answered:<br />
            <span id="display-answer">{this.state.studentAnswer}</span>
          </h2>
        </div>
      )
    }
    return this.props.question.noMoreQuestions ? (
      <div className="s-quiz-view-div">
        <div className="completed-msg">
          <h1>Congrats! You finished your MindPop!</h1>
          <Link to="/home">
            <button
              type="button"
              className="quiz-complete-home-btn"
              onClick={this.reset}
            >
              Go To Home
            </button>
          </Link>
        </div>
      </div>
    ) : !this.props.question.id ? (
      <div className="s-quiz-view-div">
        <h1 className="completed-msg">Please Wait, Quiz Will Start Soon</h1>
      </div>
    ) : (
      <div className="s-quiz-view-div">
        <div className="quiz-question">{question}</div>
        <div className="buttons-container">
          <div className="button-row">
            <button
              type="button"
              value={answerArr[0]}
              onClick={this.giveAnswer}
              className="answer-btn a1-btn"
            >
              {answerArr[0]}
            </button>
            <button
              type="button"
              value={answerArr[1]}
              onClick={this.giveAnswer}
              className="answer-btn a2-btn"
            >
              {answerArr[1]}
            </button>
          </div>
          <div className="button-row">
            <button
              type="button"
              value={answerArr[2]}
              onClick={this.giveAnswer}
              className="answer-btn a3-btn"
            >
              {answerArr[2]}
            </button>
            <button
              type="button"
              value={answerArr[3]}
              onClick={this.giveAnswer}
              className="answer-btn a4-btn"
            >
              {answerArr[3]}
            </button>
          </div>
        </div>
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
