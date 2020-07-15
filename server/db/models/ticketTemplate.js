const Sequelize = require('sequelize')
const db = require('../db')

const TicketTemplate = db.define(
  'ticketTemplate',
  {
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
    },
    ticketCode: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCreate: function(tickettemplate) {
        tickettemplate.createQuizCode()
      }
    }
  }
)

TicketTemplate.prototype.createQuizCode = function() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let newCode = ''
  for (let i = 0; i < 6; i++)
    newCode += chars[Math.floor(Math.random() * chars.length)]
  this.ticketCode = newCode
}

module.exports = TicketTemplate
