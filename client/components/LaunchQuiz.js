import React from 'react'
import {getQuestion, resetActiveQuestion} from '../store/activeQuiz'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class LaunchQuiz extends React.Component {
  constructor() {
    super()

    this.launchQuiz = this.launchQuiz.bind(this)
    this.reset = this.reset.bind(this)
  }

  launchQuiz() {
    this.props.newQuestion(this.props.quizId)

    const stopQuiz = setInterval(() => {
      if (this.props.currQuestion.noMoreQuestions) {
        clearInterval(stopQuiz)
      } else {
        this.props.newQuestion(this.props.quizId)
      }
    }, 10000)
  }

  reset() {
    this.props.resetActiveQuizState()
  }

  render() {
    return this.props.currQuestion.noMoreQuestions ? (
      <div>
        <h2>Quiz Complete!</h2>
        <em>Here are your results</em>
        <Link to="/home">
          <button type="button" onClick={this.reset}>
            Return To Home
          </button>
        </Link>
      </div>
    ) : (
      <div>
        <h1>{this.props.quizDetails.quizName} MindPop Currently In Progress</h1>
        <h3>Current Question</h3>
        <h4>{this.props.currQuestion.question}</h4>
        <button type="button" onClick={this.launchQuiz}>
          Launch Quiz
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    newQuestion: quizId => dispatch(getQuestion(quizId)),
    resetActiveQuizState: () => dispatch(resetActiveQuestion())
  }
}

const mapState = state => {
  return {
    subject: state.subjects.selectedSubject,
    quizId: state.createQuiz.quiz.id,
    currQuestion: state.activeQuiz,
    quizDetails: state.createQuiz.quiz
  }
}

export default connect(mapState, mapDispatch)(LaunchQuiz)
