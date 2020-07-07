const Sequelize = require('sequelize')
const db = require('../db')

const StudentGrade = db.define('studentGrade', {
  quizName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateOfQuiz: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  quizSubject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numOfQuestions: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  correctAnswers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  incorrectAnswers: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

StudentGrade.numNotAnswered = function() {
  return this.numOfQuestions - (this.correctAnswers + this.incorrectAnswers)
}

module.exports = StudentGrade
