const router = require('express').Router()
const Teacher = require('../db/models/teacher')
const Student = require('../db/models/student')
const Subject = require('../db/models/subject')
const User = require('../db/models/user')

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {email: req.body.email},
      include: [{model: Student}, {model: Teacher}]
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    let user = await User.create(req.body)
    await user.createTeacherOrStudent()
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Teacher already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
