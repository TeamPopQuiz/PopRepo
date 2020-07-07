'use strict'

const db = require('../server/db')
const {
  Student,
  StudentGrade,
  Subject,
  Teacher,
  TicketQuestion,
  TicketTemplate
} = require('../server/db/models')
const StudentQuestion = require('../server/db/models/students_ticketQuestions')
// const { Sequelize } = require('sequelize/types')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //Creates an array of teachers
  const teacherArray = [
    {firstName: 'celine', lastName: 'chole'},
    {firstName: 'julissa', lastName: 'napolitano'},
    {firstName: 'martha', lastName: 'betterton'},
    {firstName: 'esther', lastName: 'kim'},
    {firstName: 'jennifer', lastName: 'nugent'},
    {firstName: 'emma', lastName: 'fox'},
    {firstName: 'jasmin', lastName: 'soltani'}
  ]

  const teachers = await Promise.all(
    teacherArray.map(teacher =>
      Teacher.create({
        email: `${teacher.firstName}@teacher.com`,
        password: '123',
        firstName: teacher.firstName,
        lastName: teacher.lastName
      })
    )
  )

  //Creates an array of students
  const studentArray = [
    {firstName: 'jackie', lastName: 'francis'},
    {firstName: 'katie', lastName: 'escoto'},
    {firstName: 'lauren', lastName: 'menzies'},
    {firstName: 'eda', lastName: 'deniz'},
    {firstName: 'karolina', lastName: 'porcioncula'},
    {firstName: 'raghdaa', lastName: 'barmo'},
    {firstName: 'alesin', lastName: 'tipler'},
    {firstName: 'alison', lastName: 'hernandez'},
    {firstName: 'kate', lastName: 'norton'},
    {firstName: 'venessa', lastName: 'campbell'},
    {firstName: 'chidi', lastName: 'okeke'},
    {firstName: 'mary', lastName: 'gordanier'},
    {firstName: 'danielle', lastName: 'sisk'}
  ]

  const students = await Promise.all(
    studentArray.map(student =>
      Student.create({
        email: `${student.firstName}@student.com`,
        password: '123',
        firstName: student.firstName,
        lastName: student.lastName
      })
    )
  )

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

  console.log(
    `seeded ${teachers.length} teachers, ${students.length} students, ${
      subjects.length
    } subjects, ${templates.length} ticket templates seeded successfully`
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
  await students[0].addTicketQuestion(scienceQuestions[0])
  await students[0].addSubject(subjects[0])
  // let jackieQuestionAnswer = await StudentQuestion.findAll()
  // console.log(jackieQuestionAnswer)

  await teachers[0].addStudentGrade(jackiesGrades[0])
  await teachers[0].addStudent(students[0])
  await teachers[1].addStudent(students[1])
  await subjects[0].addStudentGrade(jackiesGrades[0])
}

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
