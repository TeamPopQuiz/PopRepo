import React, {Component} from 'react'
import {getQuizData} from '../store/quizTemplate'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {VictoryChart, VictoryBar, VictoryGroup} from 'victory'
import studentGrades from '../../script/studentGrades'

class QuizResults extends Component {
  componentDidMount() {
    this.props.fetchQuizData(this.props.match.params.quizId)
  }

  render() {
    const quiz = this.props.quiz
    console.log(this.props.quiz)
    let teacher,
      teacherName,
      date,
      subject,
      threshold,
      questions,
      allGrades,
      percentPerfect,
      allQuestionsTally
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
      console.log(questions[0].students[0].students_ticketQuestions.correct)
      allQuestionsTally = []
      let correctObj = {x: 'Correct', y: 0},
        incorrectObj = {x: 'Incorrect', y: 0},
        noAnswerObj = {x: 'No Answer', y: 0}
      questions.forEach(currQuestion => {
        correctObj.y = 0
        incorrectObj.y = 0
        noAnswerObj.y = 0
        currQuestion.students.forEach(currStudent => {
          let currAnswer
          if (!currStudent.students_ticketQuestions.correct) {
            currAnswer = null
          } else {
            currAnswer = currStudent.students_ticketQuestions.correct
          }
          if (currAnswer === true) {
            correctObj.y++
          } else if (currAnswer === false) {
            incorrectObj.y++
          } else if (currAnswer === null) {
            noAnswerObj.y++
          }
        })
        allQuestionsTally.push([correctObj, incorrectObj, noAnswerObj])
      })
      console.log(allQuestionsTally)
    }
    //This calculates whether or not the quiz threshold was met
    if (quiz.studentGrades) {
      allGrades = quiz.studentGrades
      const allPerfectScores = allGrades.reduce(
        (cumGrades, currGradeRecord) => {
          let currScore =
            currGradeRecord.correctAnswers / currGradeRecord.numOfQuestions
          if (currScore === 1) {
            return cumGrades + currScore
          }
          return cumGrades
        },
        0
      )
      percentPerfect = allPerfectScores / allGrades.length
    }

    return (
      <div>
        <div>
          {quiz.teacher && quiz.ticketQuestions ? (
            <div>
              <h1>{quiz.quizName}</h1>
              {percentPerfect * 100 >= threshold ? (
                <h3 style={{color: 'green'}}>
                  Threshold met! {percentPerfect * 100}% of your students
                  received a 100% on the quiz.
                </h3>
              ) : (
                <h3 style={{color: 'red'}}>
                  Threshold not met. {percentPerfect * 100}% of your students
                  received 100% on the quiz.
                </h3>
              )}
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
        <div>
          <VictoryChart>
            {allQuestionsTally ? (
              allQuestionsTally.map(currQuestionTally => (
                <VictoryGroup offset={30}>
                  <VictoryBar data={currQuestionTally} />
                </VictoryGroup>
              ))
            ) : (
              <h1>'No data available!'</h1>
            )}
          </VictoryChart>
        </div>
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
