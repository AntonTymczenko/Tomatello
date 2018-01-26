const {User} = require('../models')

module.exports = (prefix, router) => {
  // signup
  router.post('/signup', (req, res) => {
    const {login, password} = req.body
    User.create({login, password})
      .then(user => {
        if (!user) throw new Error()
        res.status(200).send(user)
      })
      .catch(err => {
        const errors = {
          loginRequired: 'Login is required',
          loginRegistered: 'This login is already registered',
          passwordRequired: 'Password is required'
        }
        if (err.errors) {
          if (err.errors.login) {
            if (err.errors.login.kind == 'required') {
              res.status(400).send(errors.loginRequired)
            }
          } else if (err.errors.password) {
            if (err.errors.password.kind == 'required') {
              res.status(400).send(errors.passwordRequired)
            }
          }
        } else if (err.code == 11000) {
          res.status(400).send(errors.loginRegistered)
        } else {
          console.log(err)
        }
        res.status(500).send('Internal server error')
      })
  })

  // login by credentials
  router.post('/login', (req, res) => {
    const {login, password} = req.body
    User.findByCredentials(login, password)
      .then(user => {
        res.status(200).send(user)
      })
      .catch(err => {
        res.status(403).send('Wrong credentials')
      })
  })

  // user UPDATE:
  router.put(`${prefix}/:id`, (req, res) => {
    const {publicName, userpic} = req.body
    User.findByIdAndUpdate(req.params.id, {publicName, userpic}, {new: true})
      .then(user => {
        res.status(200).send(user)
      })
      .catch(err => {
        res.status(304).send()
      })
  })

  // user's boards list:
  router.get(`${prefix}/:userId/boards`, (req, res) => {
    User.findById(req.params.userId)
      .populate('boards', '_id _user boardName')
      .then(user => {
        res.status(200).send(user.boards)
      })
      .catch(err => {
        res.status(404).send(err)
      })
  })
}
