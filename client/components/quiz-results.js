import React from 'react'
import {getQuizData} from '../store/quizTemplate'
import {connect} from 'react-redux'

export class QuizResults extends React.Component {
  componentDidMount() {
    try {
      console.log('props', this.props)
      console.log('inside component id mount')
      console.log(this.props.match.params.quizId) //1
      this.props.fetchQuizData(this.props.match.params.quizId)
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    console.log('were in the render')
    const {quiz, quizQuestions, fetchQuizData} = this.props
    const quizId = this.props.match.params.quizId

    return (
      <div>
        <h1>return</h1>

        {/* <button type="button" onClick={() => fetchQuizData(quizId)}>
          Test Button
        </button> */}
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
