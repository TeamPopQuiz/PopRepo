import React, {Component} from 'react'
import {getQuizData} from '../store/quizTemplate'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import QuizResultsPie from './QuizResultsPie'
import QuizQuestionBar from './QuizQuestionsBar'

class QuizResults extends Component {
  componentDidMount() {
    this.props.fetchQuizData(this.props.match.params.quizId)
  }

  render() {
    const quiz = this.props.quiz
    let teacher,
      teacherName,
      date,
      subject,
      threshold,
      questions,
      allGrades,
      percentPerfect,
      allQuestionsTally,
      finalPieData,
      scoreQuartiles
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
      allQuestionsTally = []
      let correctArr = []
      let incorrectArr = []
      let noAnswerArr = []

      for (let i = 0; i < questions.length; i++) {
        correctArr.push({x: `Q${i + 1}`, y: 0})
        incorrectArr.push({x: `Q${i + 1}`, y: 0})
        noAnswerArr.push({x: `Q${i + 1}`, y: 0})
      }

      questions.forEach(function(currQuestion, i) {
        currQuestion.students.forEach(currStudent => {
          let currAnswer = currStudent.students_ticketQuestions.correct
          if (currAnswer === true) {
            correctArr[i].y++
          } else if (currAnswer === false) {
            incorrectArr[i].y++
          } else if (!currAnswer) {
            noAnswerArr[i].y++
          }
        })
        allQuestionsTally = [incorrectArr, correctArr, noAnswerArr]
      })
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
    const displayNum = Math.floor(percentPerfect * 100)
    return (
      <div>
        <div className="results-text">
          <h1 className="results-header">{quiz.quizName}</h1>
          {quiz.teacher && quiz.ticketQuestions ? (
            <div>
              {percentPerfect * 100 >= threshold ? (
                <h3 style={{color: '#2A9D8F'}}>
                  Threshold met! {displayNum}% of your students received a 100%
                  on the quiz.
                </h3>
              ) : (
                <h3 style={{color: '#E76F51'}}>
                  Threshold not met. {displayNum}% of your students received
                  100% on the quiz.
                </h3>
              )}
              <h2>Teacher: </h2>
              <p>{teacherName}</p>
              <h2>Date: {date}</h2>
              <h2>Threshold: {threshold}</h2>
              <h2>Subject: {subject}</h2>
              <h2>
                Questions:{' '}
                {questions.map(currQuest => (
                  <li className="question-list" key={currQuest.id}>
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
        <div className="quiz-results-victory">
          <QuizResultsPie
            finalPieData={finalPieData}
            quizName={quiz.quizName}
            scoreQuartiles={scoreQuartiles}
            allGrades={quiz.studentGrades}
          />
          {allQuestionsTally ? (
            <QuizQuestionBar dataset={allQuestionsTally} />
          ) : (
            <h2>No question data available!</h2>
          )}
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
