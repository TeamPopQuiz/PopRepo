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

//requiring all seed files
const studentGrades = require('./studentGrades')
const userArray = require('./userList')
const subjectList = require('./subjectList')
const quizTemplateList = require('./quizTemplateList')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //creating users from user list
  await Promise.all(
    userArray.map(async user => {
      await User.create({
        email: `${user.firstName}@${user.role}.com`,
        password: '123',
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      })
    })
  )

  let userCreateArray = await User.findAll()

  //creating teachers and/or students
  userCreateArray.forEach(user => {
    user.createTeacherOrStudent()
  })

  //Creates an array of subjects
  const subjects = await Promise.all(
    subjectList.map(subjectArr =>
      Subject.create({
        name: subjectArr.subject,
        teacherId: subjectArr.teacherId
      })
    )
  )

  // Creates an array of templates
  const templates = await Promise.all(
    quizTemplateList.map(template =>
      TicketTemplate.create({
        quizName: template.quizName,
        threshold: template.threshold,
        subjectId: template.subjectId,
        date: template.date,
        teacherId: template.teacherId
      })
    )
  )

  //Creates an array of questions
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

  const sQuestionArray = [
    {
      question: 'What is the third planet from the sun?',
      rightA: 'Earth',
      wrongA1: 'Mars',
      wrongA2: 'Jupiter',
      wrongA3: 'Saturn'
    },
    {
      question: 'What is the chemical with the formula H2O?',
      rightA: 'Water',
      wrongA1: 'Coke Zero',
      wrongA2: 'Gasoline',
      wrongA3: 'Coffee'
    },
    {
      question:
        'Which noble gas is used to inflate balloons so that they float?',
      rightA: 'Helium',
      wrongA1: 'Krypton',
      wrongA2: 'Oxygen',
      wrongA3: 'Carbon Dioxide'
    },
    {
      question: 'What kind of animal is a frog?',
      rightA: 'Amphibian',
      wrongA1: 'Mammal',
      wrongA2: 'Reptile',
      wrongA3: 'Scale monster'
    },
    {
      question: 'How many planets are in our solar system?',
      rightA: '8',
      wrongA1: '23',
      wrongA2: '3',
      wrongA3: '100'
    },
    {
      question: 'What force causes objects to fall?',
      rightA: 'Gravity',
      wrongA1: 'The Force',
      wrongA2: 'Energy Field',
      wrongA3: 'Magic'
    },
    {
      question: 'Who proposed the theory of relativity?',
      rightA: 'Albert Einstein',
      wrongA1: 'Marie Curie',
      wrongA2: 'Isaac Newton',
      wrongA3: 'Stephen Hawking'
    },
    {
      question: 'Which organ pumps blood to the rest of the body?',
      rightA: 'Heart',
      wrongA1: 'Kidneys',
      wrongA2: 'Brain',
      wrongA3: 'Stomach'
    },
    {
      question:
        'What is the process by which plants convert light energy into chemical energy?',
      rightA: 'Photosynthesis',
      wrongA1: 'Cooking',
      wrongA2: 'Tanning',
      wrongA3: 'Light Baking'
    },
    {
      question: 'How many elements are in the periodic table?',
      rightA: '118',
      wrongA1: '2000',
      wrongA2: '25',
      wrongA3: '100'
    }
  ]

  const sQuestionArrayCreate = await Promise.all(
    sQuestionArray.map(async currQuestion => {
      const createdQuestion = await TicketQuestion.create({
        question: currQuestion.question,
        rightA: currQuestion.rightA,
        wrongA1: currQuestion.wrongA1,
        wrongA2: currQuestion.wrongA2,
        wrongA3: currQuestion.wrongA3
      })
      await templates[0].addTicketQuestion(createdQuestion)
    })
  )
  //creates several grade records from importat studentGrades file
  const grades = await Promise.all(
    studentGrades.map(async currGradeRecord => {
      await StudentGrade.create({
        quizName: currGradeRecord.quizName,
        dateOfQuiz: currGradeRecord.dateOfQuiz,
        quizSubject: currGradeRecord.quizSubject,
        numOfQuestions: currGradeRecord.numOfQuestions,
        correctAnswers: currGradeRecord.correctAnswers,
        incorrectAnswers: currGradeRecord.incorrectAnswers,
        teacherId: currGradeRecord.teacherId,
        studentId: currGradeRecord.studentId,
        subjectId: currGradeRecord.subjectId,
        ticketTemplateId: currGradeRecord.ticketTemplateId
      })
    })
  )

  await templates[1].addTicketQuestion(mathQuestions[0])
  await templates[1].addTicketQuestion(mathQuestions[1])

  //Assigns specific variables to teachers for relationship assignment
  const [julissa, celine, esther] = await Teacher.findAll({
    where: {
      [Op.or]: [
        {firstName: 'julissa'},
        {firstName: 'celine'},
        {firstName: 'esther'}
      ]
    }
  })

  //Assigns specific variables to students for relationship assignment

  const [
    jackie,
    lauren,
    eda,
    katie,
    raghdaa,
    alison,
    alesin,
    kate,
    venessa,
    chidi,
    mary,
    danielle,
    yang,
    sheli,
    irina
  ] = await Student.findAll({
    where: {
      [Op.or]: [
        {firstName: 'jackie'},
        {firstName: 'lauren'},
        {firstName: 'eda'},
        {firstName: 'katie'},
        {firstName: 'raghdaa'},
        {firstName: 'alison'},
        {firstName: 'alesin'},
        {firstName: 'kate'},
        {firstName: 'venessa'},
        {firstName: 'chidi'},
        {firstName: 'mary'},
        {firstName: 'danielle'},
        {firstName: 'yang'},
        {firstName: 'sheli'},
        {firstName: 'irina'}
      ]
    }
  })

  //Assigns specific variables to templates for relationshp assignment
  const [scienceQuiz, mathQuiz] = await TicketTemplate.findAll({
    where: {
      [Op.or]: [{id: 1}, {id: 2}]
    }
  })

  //Assigns specific variables questions for relationship assignment
  let [
    scienceQ1,
    scienceQ2,
    scienceQ3,
    scienceQ4,
    scienceQ5,
    scienceQ6,
    scienceQ7,
    scienceQ8,
    scienceQ9,
    scienceQ10
  ] = await TicketQuestion.findAll({
    where: {
      [Op.or]: [
        {question: 'What is the third planet from the sun?'},
        {question: 'What is the chemical with the formula H2O?'},
        {
          question:
            'Which noble gas is used to inflate balloons so that they float?'
        },
        {question: 'What kind of animal is a frog?'},
        {question: 'How many planets are in our solar system?'},
        {question: 'What force causes objects to fall?'},
        {question: 'Who proposed the theory of relativity?'},
        {question: 'Which organ pumps blood to the rest of the body?'},
        {
          question:
            'What is the process by which plants convert light energy into chemical energy?'
        },
        {question: 'How many elements are in the periodic table?'}
      ]
    }
  })

  const scienceQuestions = [
    scienceQ1,
    scienceQ2,
    scienceQ3,
    scienceQ4,
    scienceQ5,
    scienceQ6,
    scienceQ7,
    scienceQ8,
    scienceQ9,
    scienceQ10
  ]

  //Adding students to teachers
  await julissa.addStudents([lauren, katie, chidi, sheli, danielle])
  await celine.addStudents([eda, jackie, venessa, irina, alesin])
  await esther.addStudents([alison, raghdaa, yang, mary, kate])

  //Adding specific questions to students
  await Promise.all(
    scienceQuestions.map(async currQuestion => {
      await eda.addTicketQuestion(currQuestion)
      await jackie.addTicketQuestion(currQuestion)
      await venessa.addTicketQuestion(currQuestion)
      await irina.addTicketQuestion(currQuestion)
      await alesin.addTicketQuestion(currQuestion)
    })
  )

  //Adding specific subjects to students
  await eda.addSubject(subjects[0])

  //Adding grades to specific subjects
  await subjects[0].addStudentGrade(grades[0])

  //Adding quizzes to teachers
  await julissa.addTicketTemplate(mathQuiz)
  await celine.addTicketTemplate(scienceQuiz)
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
