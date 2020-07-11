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

// Teacher.prototype.getSubjects = async function() {
//   const subjectsArr = await this.getSubjects()
//   return subjectsArr
// }

module.exports = Teacher
