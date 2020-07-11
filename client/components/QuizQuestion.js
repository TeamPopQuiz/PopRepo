import React, {Component} from 'react'
import {getQuizQuestion} from '../store/quizTemplate'
import {connect} from 'react-redux'
import {VictoryPie} from 'victory'

class QuizQuestion extends Component {
  componentDidMount() {
    this.props.fetchQuizQuestion(this.props.match.params.questionId)
  }

  render() {
    const question = this.props.selectedQuestion
    console.log(question)

    return (
      <div>
        {question ? (
          <div>
            <h1>{question.quizName}</h1>
          </div>
        ) : (
          <h1>Undefined!</h1>
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchQuizQuestion: questionId => dispatch(getQuizQuestion(questionId))
  }
}

const mapState = state => {
  return {
    selectedQuestion: state.quizTemplate.selectedQuestion
  }
}

export default connect(mapState, mapDispatch)(QuizQuestion)
