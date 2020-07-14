import React, {Component} from 'react'
import {getQuizQuestion} from '../store/quizTemplate'
import {connect} from 'react-redux'
import {VictoryPie} from 'victory'

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
        } else if (student.students_ticketQuestions.correct === false) {
          allAnswers.incorrect++
          incorrectStudents.push(`${student.firstName} ${student.lastName}`)
        } else {
          allAnswers.noAnswer++
          noAnswerStudents.push(`${student.firstName} ${student.lastName}`)
        }
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
          <div>
            <h1>{question.question}</h1>
            <VictoryPie
              //height={200}
              origin={80}
              height={150}
              padding={30}
              colorScale={['tomato', 'orange', 'gold']}
              data={dataSet}
              labels={({datum}) => `${datum.x}: ${datum.y}`}
            />
            <div className="quiz-lists">
              <h2 className="statsClass">
                {' '}
                {correctStudents.length} ? Correct:{' '}
                {correctStudents.map(currStudent => <li>{currStudent}</li>)} :{' '}
                {null}
              </h2>
              <h2 className="statsClass">
                Incorrect:{' '}
                {incorrectStudents.map(currStudent => <li>{currStudent}</li>)}
              </h2>
              <h2 className="statsClass">
                No Answer:{' '}
                {noAnswerStudents.map(currStudent => <li>{currStudent}</li>)}
              </h2>
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
