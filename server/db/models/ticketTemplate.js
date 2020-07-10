const Sequelize = require('sequelize')
const db = require('../db')

const TicketTemplate = db.define('ticketTemplate', {
  quizName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY
  },
  threshold: {
    type: Sequelize.INTEGER
  }
})

module.exports = TicketTemplate
