'use strict'

const db = require('../server/db')
const {
  Student,
  StudentGrade,
  Subject,
  Teacher,
  TicketQuestion,
  TicketTemplate,
  User
} = require('../server/db/models')
const StudentQuestion = require('../server/db/models/students_ticketQuestions')
const {Sequelize, Op} = require('sequelize')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //Creates an array of teachers
  const userArray = [
    {firstName: 'celine', lastName: 'chole', role: 'teacher'},
    {firstName: 'julissa', lastName: 'napolitano', role: 'teacher'},
    {firstName: 'martha', lastName: 'betterton', role: 'teacher'},
    {firstName: 'esther', lastName: 'kim', role: 'teacher'},
    {firstName: 'jennifer', lastName: 'nugent', role: 'teacher'},
    {firstName: 'emma', lastName: 'fox', role: 'teacher'},
    {firstName: 'jasmin', lastName: 'soltani', role: 'teacher'},
    {firstName: 'jackie', lastName: 'francis', role: 'student'},
    {firstName: 'katie', lastName: 'escoto', role: 'student'},
    {firstName: 'lauren', lastName: 'menzies', role: 'student'},
    {firstName: 'eda', lastName: 'deniz', role: 'student'},
    {firstName: 'karolina', lastName: 'porcioncula', role: 'student'},
    {firstName: 'raghdaa', lastName: 'barmo', role: 'student'},
    {firstName: 'alesin', lastName: 'tipler', role: 'student'},
    {firstName: 'alison', lastName: 'hernandez', role: 'student'},
    {firstName: 'kate', lastName: 'norton', role: 'student'},
    {firstName: 'venessa', lastName: 'campbell', role: 'student'},
    {firstName: 'chidi', lastName: 'okeke', role: 'student'},
    {firstName: 'mary', lastName: 'gordanier', role: 'student'},
    {firstName: 'danielle', lastName: 'sisk', role: 'student'}
  ]

  const users = await Promise.all(
    userArray.map(async user => {
      await User.create({
        email: `${user.firstName}@${user.role}.com`,
        password: '123',
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      })
      //newTOrS.createTeacherOrStudent(newTOrS.firstName, newTOrS.lastName, newTOrS.role)
    })
  )

  let userCreateArray = await User.findAll()

  userCreateArray.forEach(user => {
    user.createTeacherOrStudent()
  })

  //Creates an array of subjects
  const subjectArray = [
    'Science',
    'Math',
    'Social Studies',
    'English',
    'Art',
    'Study Hall'
  ]

  const subjects = await Promise.all(
    subjectArray.map(subject => Subject.create({name: subject}))
  )

  // Creates an array of templates
  const templateArray = [
    {quizName: 'Science Quiz', threshold: 90},
    {quizName: 'Math Quiz', threshold: 85},
    {quizName: 'English Quiz', threshold: 70},
    {quizName: 'Study Hall Quiz', threshold: 100},
    {quizName: 'Last Day of School Fun Quiz', threshold: 50}
  ]

  const templates = await Promise.all(
    templateArray.map(template =>
      TicketTemplate.create({
        quizName: template.quizName,
        threshold: template.threshold
      })
    )
  )

  const mathQuestions = await Promise.all([
    TicketQuestion.create({
      question: 'What is 1 + 2?',
      rightA: '3',
      wrongA1: '43',
      wrongA2: '2',
      wrongA3: 'George Washington'
    }),
    TicketQuestion.create({
      question: 'What is 7 x 7?',
      rightA: '49',
      wrongA1: '100',
      wrongA2: 'Fractions',
      wrongA3: '.78'
    })
  ])

  const scienceQuestions = await Promise.all([
    TicketQuestion.create({
      question: 'What is the third planet from the sun?',
      rightA: 'Earth',
      wrongA1: 'Mars',
      wrongA2: 'Jupiter',
      wrongA3: 'Saturn'
    }),
    TicketQuestion.create({
      question: 'What is the chemical with the formula H2O?',
      rightA: 'Water',
      wrongA1: 'Coke Zero',
      wrongA2: 'Gasoline',
      wrongA3: 'Hydrogen Peroxide'
    })
  ])

  const jackiesGrades = await Promise.all([
    StudentGrade.create({
      quizName: 'Science Quiz',
      dateOfQuiz: '2020-07-06',
      quizSubject: 'Science',
      numOfQuestions: 10,
      correctAnswers: 7,
      incorrectAnswers: 2
    })
  ])

  await templates[1].addTicketQuestion(mathQuestions[0])
  await templates[1].addTicketQuestion(mathQuestions[1])
  await templates[0].addTicketQuestion(scienceQuestions[0])
  await templates[0].addTicketQuestion(scienceQuestions[1])
  //await students[0].addStudentGrade(jackiesGrades[0])
  // let jackieQuestionAnswer = await StudentQuestion.findAll()
  // console.log(jackieQuestionAnswer)

  const [julissa, celine, esther] = await Teacher.findAll({
    where: {
      [Op.or]: [
        {firstName: 'julissa'},
        {firstName: 'celine'},
        {firstName: 'esther'}
      ]
    }
  })

  const [jackie, lauren, eda, katie, raghdaa, alison] = await Student.findAll({
    where: {
      [Op.or]: [
        {firstName: 'jackie'},
        {firstName: 'lauren'},
        {firstName: 'eda'},
        {firstName: 'katie'},
        {firstName: 'raghdaa'},
        {firstName: 'alison'}
      ]
    }
  })

  console.log(`julissa: ${julissa}`)
  //console.log(jackie)
  await julissa.addStudents([lauren, katie])
  await celine.addStudents([eda, jackie])
  await esther.addStudents([alison, raghdaa])
  await eda.addTicketQuestion(scienceQuestions[0])
  await eda.addSubject(subjects[0])
  await subjects[0].addStudentGrade(jackiesGrades[0])
}

console.log('Seeded successfully!')

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
