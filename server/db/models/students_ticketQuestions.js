const Sequelize = require('sequelize')
const db = require('../db')

const StudentQuestion = db.define('students_ticketQuestions', {
  correct: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = StudentQuestion
