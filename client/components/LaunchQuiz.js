import React from 'react'
import {getQuestion} from '../store/activeQuiz'
import {connect} from 'react-redux'

export class LaunchQuiz extends React.Component {
  constructor() {
    super()

    this.launchQuiz = this.launchQuiz.bind(this)
  }

  launchQuiz() {
    this.props.newQuestion(this.props.quizId)
  }

  render() {
    return (
      <div>
        <h1>Quiz to Launch</h1>
        <button type="button" onClick={this.launchQuiz}>
          Launch Quiz
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    newQuestion: quizId => dispatch(getQuestion(quizId))
  }
}

const mapState = state => {
  return {
    subject: state.subjects.selectedSubject,
    quizId: state.createQuiz.quiz.id
  }
}

export default connect(mapState, mapDispatch)(LaunchQuiz)
