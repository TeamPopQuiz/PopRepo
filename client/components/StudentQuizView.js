import React from 'react'
import {connect} from 'react-redux'
import {updateQuiz, getQuestion} from '../store/activeQuiz'

class StudentQuizView extends React.Component {
  constructor() {
    super()

    this.launchQuiz = this.launchQuiz.bind(this)
  }

  launchQuiz() {
    this.props.newQuestion(1)
    // this.props.update()
  }

  render() {
    return (
      <div>
        <h3>Question Details</h3>
        <ul>
          <li>{this.props.question.question}</li>
        </ul>
        <button type="button" onClick={this.launchQuiz}>
          Launch Quiz
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    question: state.activeQuiz
  }
}

const mapDispatch = dispatch => {
  return {
    update: () => dispatch(updateQuiz()),
    newQuestion: id => dispatch(getQuestion(id))
  }
}

export default connect(mapState, mapDispatch)(StudentQuizView)
