import React, {Component} from 'react'
import {getQuizQuestion} from '../store/quizTemplate'
import {connect} from 'react-redux'
import {VictoryPie, VictoryLabel} from 'victory'
import {NavLink} from 'react-router-dom'

class QuizQuestion extends Component {
  componentDidMount() {
    this.props.fetchQuizQuestion(
      this.props.match.params.questionId,
      this.props.match.params.quizId
    )
  }

  render() {
    const question = this.props.selectedQuestion
    const students = question.students
    let allAnswers = {incorrect: 0, correct: 0, noAnswer: 0}
    let correctStudents = []
    let incorrectStudents = []
    let noAnswerStudents = []

    if (students) {
      let statCounts = students.reduce((accum, student) => {
        if (student.students_ticketQuestions.correct === true) {
          allAnswers.correct++
          correctStudents.push(`${student.firstName} ${student.lastName}`)
        } else if (
          student.students_ticketQuestions.correct === false ||
          student.students_ticketQuestions.corrext === null
        ) {
          allAnswers.incorrect++
          incorrectStudents.push(`${student.firstName} ${student.lastName}`)
        }
        //Restore at a later time when we can calculate null answers
        // else if (student.students_ticketQuestions.correct===null) {
        //   allAnswers.noAnswer++
        //   noAnswerStudents.push(`${student.firstName} ${student.lastName}`)
        // }
        return accum
      }, {})
    }
    let dataSet = []
    for (const key in allAnswers) {
      if (allAnswers[key] !== 0) {
        dataSet.push({x: key, y: allAnswers[key]})
      }
    }

    return (
      <div>
        {question ? (
          <div className="results-text">
            <h1>{question.question}</h1>
            <VictoryPie
              origin={{x: 200, y: 60}}
              height={125}
              padding={30}
              colorScale={['tomato', 'orange', 'gold']}
              data={dataSet}
              labels={({datum}) => `${datum.x}: ${datum.y}`}
              labelComponent={<VictoryLabel style={[{fontSize: 8}]} />}
              fixLabelOverlap={true}
            />
            <div className="quiz-lists">
              <h2 className="statsClass">
                Correct:{' '}
                {correctStudents.map((currStudent, i) => (
                  <li key={i}>{currStudent}</li>
                ))}
              </h2>
              <h2 className="statsClass">
                Incorrect/No Answer:{' '}
                {incorrectStudents.map((currStudent, i) => (
                  <li key={i}>{currStudent}</li>
                ))}
              </h2>
              {/* Restore at a later time when we can calculate null answers */}
              {/* <h2 className="statsClass">
                No Answer:{' '}
                {noAnswerStudents.map((currStudent, i) => <li key={i}>{currStudent}</li>)}
              </h2> */}
            </div>
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
    fetchQuizQuestion: (questionId, quizId) =>
      dispatch(getQuizQuestion(questionId, quizId))
  }
}

const mapState = state => {
  return {
    selectedQuestion: state.quizTemplate.selectedQuestion
  }
}

export default connect(mapState, mapDispatch)(QuizQuestion)
