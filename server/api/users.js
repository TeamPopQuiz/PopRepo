const router = require('express').Router()
const {
  Teacher,
  Student,
  Subject,
  User,
  TicketTemplate,
  TicketQuestion
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
      include: [{model: Student}, {model: Teacher}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/quizTemplates/:quizId', async (req, res, next) => {
  try {
    const quiz = await TicketTemplate.findAll({
      where: {
        id: req.params.quizId
      },
      include: [{model: Teacher}, {model: Subject}]
    })
    const questions = await TicketQuestion.findAll({
      where: {
        ticketTemplateId: req.params.quizId
      }
    })
    res.json(quiz, questions)
  } catch (err) {
    next(err)
  }
})
