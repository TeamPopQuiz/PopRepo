import React, {Component} from 'react'
import {getQuizData} from '../store/quizTemplate'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {VictoryPie} from 'victory'

class QuizResults extends Component {
  componentDidMount() {
    this.props.fetchQuizData(this.props.match.params.quizId)
  }

  render() {
    const quiz = this.props.quiz
    console.log(quiz)
    let teacher, teacherName, date, subject, threshold, questions
    if (quiz.teacher) {
      teacher = quiz.teacher
      teacherName = `${teacher.firstName} ${teacher.lastName}`
      date = quiz.date
      threshold = quiz.threshold
    }
    if (quiz.subject) {
      subject = quiz.subject.name
    }
    if (quiz.ticketQuestions) {
      questions = quiz.ticketQuestions
    }
    return (
      <div>
        {quiz.teacher && quiz.ticketQuestions ? (
          <div>
            <h1>{quiz.quizName}</h1>
            <h2>Teacher: {teacherName}</h2>
            <h2>Date: {date}</h2>
            <h2>Threshold: {threshold}</h2>
            <h2>Subject: {subject}</h2>
            <h2>
              Questions:{' '}
              {questions.map(currQuest => (
                <li key={currQuest.id}>
                  <Link
                    to={`/quizzes/${currQuest.ticketTemplateId}/questions/${
                      currQuest.id
                    }`}
                  >
                    {currQuest.question}
                  </Link>
                </li>
              ))}
            </h2>
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
    fetchQuizData: quizId => dispatch(getQuizData(quizId))
  }
}

const mapState = state => {
  return {
    quiz: state.quizTemplate.quiz
  }
}

export default connect(mapState, mapDispatch)(QuizResults)
