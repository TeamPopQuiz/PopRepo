const router = require('express').Router()
const {TicketTemplate} = require('../db/models')
module.exports = router

router.post('/createQuiz', async (req, res, next) => {
  try {
    console.log('this is req body', req.body)
    const quiz = await TicketTemplate.create({
      quizName: req.body.quizName,
      threshold: req.body.threshold
    })
    res.json(quiz)
  } catch (error) {
    console.error(error)
  }
})
