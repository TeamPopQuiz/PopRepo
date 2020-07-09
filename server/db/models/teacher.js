const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Teacher = db.define('teacher', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Teacher
