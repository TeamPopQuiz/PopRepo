import React from 'react'
import {connect} from 'react-redux'
import {updateQuiz} from '../store/activeQuiz'

class StudentQuizView extends React.Component {
  render() {
    let {question, rightA, wrongA1, wrongA2, wrongA3} = this.props.question
    return (
      <div>
        <h3>Question Details</h3>
        <ul>
          <li>{question}</li>
          <div>
            <button type="button" value={rightA}>
              {rightA}
            </button>
            <button type="button" value={wrongA1}>
              {wrongA1}
            </button>
          </div>
          <div>
            <button type="button" value={wrongA2}>
              {wrongA2}
            </button>
            <button type="button" value={wrongA3}>
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
    question: state.activeQuiz
  }
}

const mapDispatch = dispatch => {
  return {
    update: () => dispatch(updateQuiz())
  }
}

export default connect(mapState, mapDispatch)(StudentQuizView)
