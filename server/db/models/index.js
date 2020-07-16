const Student = require('./student')
const StudentGrade = require('./studentGrade')
const Subject = require('./subject')
const Teacher = require('./teacher')
const TicketQuestion = require('./ticketQuestion')
const TicketTemplate = require('./ticketTemplate')
const StudentQuestion = require('./students_ticketQuestions')
// const { Student, StudentGrade, Subject, Teacher, TicketQuestion, TicketTemplate, StudentQuestion } = require('../models')
const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//User - One to One with Teachers/Students
User.hasOne(Teacher)
User.hasOne(Student)

//Teacher - One to Many relationships
Teacher.hasMany(Subject)
Teacher.hasMany(Student)
Teacher.hasMany(TicketTemplate)
Teacher.hasMany(StudentGrade)
Teacher.belongsTo(User)

//Student relationships
Student.hasMany(StudentGrade)
Student.belongsTo(Teacher)
Student.belongsToMany(TicketQuestion, {through: 'students_ticketQuestions'})
Student.belongsToMany(Subject, {through: 'subject_student'})
Student.belongsTo(User)

//Subject relationships
Subject.hasMany(TicketTemplate)
Subject.hasMany(StudentGrade)
Subject.belongsTo(Teacher)
Subject.belongsToMany(Student, {through: 'subject_student'})

//TicketTemplate relationships
TicketTemplate.hasMany(StudentGrade)
TicketTemplate.hasMany(TicketQuestion)
TicketTemplate.hasMany(StudentGrade)
TicketTemplate.belongsTo(Teacher)
TicketTemplate.belongsTo(Subject)

//TicketQuestion relationships
TicketQuestion.belongsToMany(Student, {through: 'students_ticketQuestions'})
TicketQuestion.belongsTo(TicketTemplate)

//Student grade relationships
StudentGrade.belongsTo(Teacher)
StudentGrade.belongsTo(Student)
StudentGrade.belongsTo(Subject)
StudentGrade.belongsTo(TicketTemplate)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Student,
  StudentGrade,
  Subject,
  Teacher,
  TicketQuestion,
  TicketTemplate,
  StudentQuestion,
  User
}
