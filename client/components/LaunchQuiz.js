import React from 'react'
import {getQuestion, resetActiveQuestion} from '../store/activeQuiz'
import {getQuizData} from '../store/quizTemplate'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'

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
    history.push(`/quizzes/${this.props.quizId}`)
  }

  render() {
    return this.props.currQuestion.noMoreQuestions ? (
      <div className="complete-container">
        <h1>Quiz Complete!</h1>
        <p>Click Here To See Your Results</p>
        <button type="button" onClick={this.reset}>
          Quiz Results
        </button>
      </div>
    ) : (
      <div className="complete-container">
        <h1>
          <span className="complete-q-name">
            {this.props.quizDetails.quizName}{' '}
          </span>MindPop
        </h1>
        <h2>Give your students this code to join quiz:</h2>
        <div id="code">{this.props.quizDetails.ticketCode}</div>
        <h3>Current Question</h3>
        <p className="complete-q">{this.props.currQuestion.question}</p>
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
