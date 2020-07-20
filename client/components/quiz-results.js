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
        allQuestionsTally = [correctArr, incorrectArr, noAnswerArr]
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
      <div className="results-text">
        <h1>{quiz.quizName}</h1>
        <div>
          {quiz.teacher && quiz.ticketQuestions ? (
            <div className="results-body">
              {percentPerfect * 100 >= threshold ? (
                <h3 style={{color: '#2A9D8F'}}>
                  Threshold met! {displayNum}% of your students completed the
                  quiz with a perfect score.
                </h3>
              ) : (
                <h3 style={{color: '#E76F51'}}>
                  Threshold not met. {displayNum}% of your students completed
                  the quiz with a perfect score.
                </h3>
              )}
              <div>
                <div className="results-body">
                  <h2>Teacher: </h2>
                  <p>{teacherName}</p>
                  <h2>Date: </h2>
                  <p>{date}</p>
                  <h2>Threshold: </h2>
                  <p>{threshold}</p>
                  <h2>Subject: </h2>
                  <p>{subject}</p>
                </div>
                <h2 className="quiz-question-list">
                  Questions:{' '}
                  {questions.map((currQuest, i) => (
                    <li key={currQuest.id}>
                      Q{i + 1}:
                      <Link
                        to={`/quizzes/${currQuest.ticketTemplateId}/questions/${
                          currQuest.id
                        }`}
                      >
                        {` ${currQuest.question}`}
                      </Link>
                    </li>
                  ))}
                </h2>
              </div>
            </div>
          ) : (
            <h1>Undefined!</h1>
          )}
        </div>
        <div className="victory-components-main">
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
