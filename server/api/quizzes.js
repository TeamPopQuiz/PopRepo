const router = require('express').Router()
const {TicketTemplate, TicketQuestion} = require('../db/models')
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
