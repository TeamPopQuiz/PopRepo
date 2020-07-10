import React from 'react'
import {getQuizData} from '../store/quizTemplate'
import {connect} from 'react-redux'

export class QuizResults extends React.Component {
  componentDidMount() {
    try {
      this.props.fetchQuizData(this.props.match.params.quizId)
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    const {quiz, quizQuestions, fetchQuizData} = this.props
    const quizId = this.props.match.params.quizId

    return (
      <div>
        <h1>This component is rendering!</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    quiz: state.quiz,
    questions: state.questions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchQuizData: quizId => dispatch(getQuizData(quizId))
  }
}

export default connect(mapState, mapDispatch)(QuizResults)
