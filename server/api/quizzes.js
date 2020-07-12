const router = require('express').Router()
const {
  TicketTemplate,
  TicketQuestion,
  Teacher,
  Subject
} = require('../db/models')
module.exports = router

router.post('/createQuiz', async (req, res, next) => {
  try {
    const quiz = await TicketTemplate.create({
      quizName: req.body.quiz.quizName,
      threshold: req.body.quiz.threshold,
      date: req.body.quiz.date
    })
    const teacher = await Teacher.findOne({where: {userId: req.user.id}})
    const subject = await Subject.findOne({where: {id: req.body.subjectId}})
    quiz.setTeacher(teacher)
    quiz.setSubject(subject)
    res.json(quiz)
  } catch (error) {
    console.error(error)
  }
})

router.post('/addQuestion', async (req, res, next) => {
  try {
    const question = await TicketQuestion.create({
      question: req.body.qAndA.question,
      rightA: req.body.qAndA.correctAnswer,
      wrongA1: req.body.qAndA.wrongAnswer1,
      wrongA2: req.body.qAndA.wrongAnswer2,
      wrongA3: req.body.qAndA.wrongAnswer3
    })
    const ticketTemplate = await TicketTemplate.findOne({
      where: {id: req.body.ttId}
    })
    question.setTicketTemplate(ticketTemplate)
    res.json(question)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/deleteQuestion', async (req, res, next) => {
  console.log('what is req.body', req.body)
  try {
    console.log('req body id', req.body.id)
    const deleted = await TicketQuestion.destroy({where: {id: req.body.id}})
    console.log('after destroy')
    res.json(deleted)
  } catch (error) {
    console.error(error)
  }
})
