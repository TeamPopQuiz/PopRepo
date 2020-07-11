const router = require('express').Router()
const {Teacher, Student, Subject, User} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user.role === 'teacher') {
      const teacher = await Teacher.findOne({where: {userId: req.user.id}})
      const teacherSubjectsArr = await teacher.getSubjects()
      res.json(teacherSubjectsArr)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user.role === 'teacher') {
      const teacher = await Teacher.findOne({where: {userId: req.user.id}})
      const teacherSubject = await teacher.getSubjects({
        where: {
          id: req.params.id
        }
      })
      res.json(teacherSubject)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const newSubject = await Subject.create({
      name: req.body.subjectName,
      roomCode: req.body.subjectCode
    })
    console.log('new subject:', newSubject)
    if (req.body.role === 'teacher') {
      const teacher = await Teacher.findOne({where: {userId: req.user.id}})
      await teacher.addSubject(newSubject)
      const updatedSubjects = await teacher.getSubjects()
      res.json(updatedSubjects)
    }
  } catch (error) {
    next(error)
  }
})
