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
    history.push(`/quizzes/${this.props.quizId}`)
    this.props.resetActiveQuizState()
  }

  render() {
    return this.props.currQuestion.noMoreQuestions ? (
      <div>
        <h2>Quiz Complete!</h2>
        <em>Here are your results</em>
        <button type="button" onClick={this.reset}>
          See Quiz Results
        </button>
        {/* <Link to={`api/quizzes/${this.props.quizId}`}>
          <button type="button" onClick={this.reset}>
            See Quiz Results
          </button>
        </Link> */}
      </div>
    ) : (
      <div>
        <h1>{this.props.quizDetails.quizName} MindPop Currently In Progress</h1>
        <h2>{this.props.quizDetails.quizName} </h2>
        <h2>
          Give your students this code: {this.props.quizDetails.ticketCode}{' '}
        </h2>
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
