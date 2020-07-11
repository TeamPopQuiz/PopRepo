const Sequelize = require('sequelize')
const db = require('../db')

const TicketQuestion = db.define('ticketQuestion', {
  question: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rightA: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  wrongA1: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  wrongA2: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  wrongA3: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  QGiven: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = TicketQuestion
