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
    {quizName: 'Science Quiz', threshold: 90, subjectId: 1},
    {quizName: 'Math Quiz', threshold: 85, subjectId: 2},
    {quizName: 'English Quiz', threshold: 70, subjectId: 4},
    {quizName: 'Study Hall Quiz', threshold: 100, subjectId: 6},
    {quizName: 'Last Day of School Fun Quiz', threshold: 50, subjectId: 6}
  ]

  const templates = await Promise.all(
    templateArray.map(template =>
      TicketTemplate.create({
        quizName: template.quizName,
        threshold: template.threshold,
        subjectId: template.subjectId
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

  const questionArray = [
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

  const scienceQuestions = await Promise.all(
    questionArray.map(async currQuestion => {
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
  //await templates[0].addTicketQuestion(scienceQuestions[0])
  //await templates[0].addTicketQuestion(scienceQuestions[1])
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

  const [scienceQuiz, mathQuiz] = await TicketTemplate.findAll({
    where: {
      [Op.or]: [{id: 1}, {id: 2}]
    }
  })

  await julissa.addStudents([lauren, katie])
  await celine.addStudents([eda, jackie])
  await esther.addStudents([alison, raghdaa])
  await eda.addTicketQuestion(scienceQuestions[0])
  await eda.addSubject(subjects[0])
  await subjects[0].addStudentGrade(jackiesGrades[0])
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
