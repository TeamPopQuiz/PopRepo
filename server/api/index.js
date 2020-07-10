const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/subjects', require('./subjects'))
router.use('/students', require('./students'))
router.use('/quizzes', require('./quizzes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
