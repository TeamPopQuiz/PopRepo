import React from 'react'
import {getQuizData} from '../store/quizTemplate'
import {connect} from 'react-redux'

export const QuizResults = props => {
  const {quiz, quizQuestions, getQuizData} = props
  const quizId = props.match.params.quizId

  return (
    <div>
      <button type="button" onClick={() => props.getQuizData(quizId)}>
        Test Button
      </button>
    </div>
  )
}

const mapState = state => {
  return {
    quiz: state.quiz,
    questions: state.questions
  }
}

const mapDispatch = dispatch => {
  return {
    getQuizData: quizId => dispatch(getQuizData(quizId))
  }
}

export default connect(mapState, mapDispatch)(QuizResults)
