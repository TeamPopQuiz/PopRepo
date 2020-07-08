const router = require('express').Router()
const {Teacher, Student, Subject} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Teacher.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
      include: [{model: Student}, {model: Subject}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/add-subject-room', async (req, res, next) => {
  try {
    const [teacher, subject] = await Promise.all([
      Teacher.findByPk(req.user.id),
      Subject.create(req.body)
    ])
    await subject.setTeacher(teacher)
    const newTeacher = await Teacher.findByPk(req.user.id, {
      include: [{model: Student}, {model: Subject}]
    })
    res.json(newTeacher)
  } catch (error) {
    next(error)
  }
})
