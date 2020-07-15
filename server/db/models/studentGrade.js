const Sequelize = require('sequelize')
const db = require('../db')

const StudentGrade = db.define('studentGrade', {
  quizName: {
    type: Sequelize.STRING
    // allowNull: false
  },
  dateOfQuiz: {
    type: Sequelize.DATEONLY
    // allowNull: false
  },
  quizSubject: {
    type: Sequelize.STRING
    // allowNull: false
  },
  numOfQuestions: {
    type: Sequelize.INTEGER
    // allowNull: false
  },
  correctAnswers: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  incorrectAnswers: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

StudentGrade.numNotAnswered = function() {
  return this.numOfQuestions - (this.correctAnswers + this.incorrectAnswers)
}

module.exports = StudentGrade
