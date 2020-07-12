import React from 'react'
import {connect} from 'react-redux'
import {updateQuiz} from '../store/activeQuiz'

class StudentQuizView extends React.Component {
  render() {
    return (
      <div>
        <h3>Question Details</h3>
        <ul>
          <li>{this.props.question.question}</li>
        </ul>
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
    update: () => dispatch(updateQuiz())
  }
}

export default connect(mapState, mapDispatch)(StudentQuizView)
