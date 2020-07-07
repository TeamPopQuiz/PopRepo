const Sequelize = require('sequelize')
const db = require('../db')

const TicketTemplate = db.define('ticketTemplate', {
  quizName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  threshold: {
    type: Sequelize.INTEGER
  }
})

module.exports = TicketTemplate
