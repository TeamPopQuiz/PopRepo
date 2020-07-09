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
