const router = require('express').Router()
const {
  TicketTemplate,
  TicketQuestion,
  Student,
  StudentQuestion
} = require('../db/models')
module.exports = router

router.post('/createQuiz', async (req, res, next) => {
  try {
    const quiz = await TicketTemplate.create({
      quizName: req.body.quizName,
      threshold: req.body.threshold,
      date: req.body.date
      //need to add teacherId and subjectId
    })
    res.json(quiz)
  } catch (error) {
    console.error(error)
  }
})

router.post('/addQuestion', async (req, res, next) => {
  try {
    const question = await TicketQuestion.create({
      question: req.body.question,
      rightA: req.body.correctAnswer,
      wrongA1: req.body.wrongAnswer1,
      wrongA2: req.body.wrongAnswer2,
      wrongA3: req.body.wrongAnswer3
    })
    res.json(question)
    //need magic method to add tickettemplateId
  } catch (error) {
    console.error(error)
  }
})

//get quiz questions to be sent via socket
router.put('/active-ticket-questions', async (req, res, next) => {
  try {
    const questionsArr = await TicketQuestion.findOne({
      where: {ticketTemplateId: req.body.ticketId, QGiven: false}
    })
    res.json(questionsArr)
  } catch (error) {
    next(error)
  }
})

router.put('/finished-question', async (req, res, next) => {
  try {
    await TicketQuestion.update({QGiven: true}, {where: {id: req.body.id}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.post('/submit-answer', async (req, res, next) => {
  try {
    const [student, question] = await Promise.all([
      Student.findByPk(req.body.studentId),
      TicketQuestion.findByPk(req.body.questionId)
    ])
    await student.addTicketQuestion(question)
    let association = await StudentQuestion.findOne({
      where: {
        studentId: req.body.studentId,
        ticketQuestionId: req.body.questionId
      }
    })
    if (req.body.answer === question.rightA) {
      association.correct = true
    } else {
      association.correct = false
    }
    await association.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
