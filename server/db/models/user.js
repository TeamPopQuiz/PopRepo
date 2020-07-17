const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Teacher = require('../models/teacher')
const Student = require('../models/student')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  teacherLastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.ENUM('teacher', 'student'),
    allowNull: false
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.createTeacherOrStudent = async function() {
  if (this.role === 'teacher') {
    const thisTeacher = await Teacher.create({
      firstName: this.firstName,
      lastName: this.lastName
    })
    await this.setTeacher(thisTeacher)
  } else if (this.role === 'student') {
    const thisStudent = await Student.create({
      firstName: this.firstName,
      lastName: this.lastName
    })
    await this.setStudent(thisStudent)
    let teacher = await Teacher.findOne({
      where: {
        lastName: this.teacherLastName.toLowerCase()
      }
    })
    await thisStudent.setTeacher(teacher)
  }
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
