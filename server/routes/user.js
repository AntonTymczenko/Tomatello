const {User} = require('../models')
const worstScenario = (err, res) => {
  console.log(err)
  res.status(500).send('Internal server error')
}

module.exports = (prefix, router) => {
  // signup
  router.post('/signup', (req, res) => {
    const {login, password} = req.body
    User.create({login, password})
      .then(async user => {
        if (!user) throw new Error()
        const token = await user.giveAuthToken()
        if (token) {
          res.header('x-auth', token)
        } else {
          console.error('No Auth token generated')
        }
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
          } else {
            worstScenario(err, res)
          }
        } else if (err.code == 11000) {
          res.status(400).send(errors.loginRegistered)
        } else {
          worstScenario(err, res)
        }
      })
  })

  // login
  router.post('/login', (req, res) => {
    const {login, password} = req.body
    if (login && password) {
      // login by credentials
      User.findByCredentials(login, password)
        .then(async user => {
          const token = await user.giveAuthToken()
          if (token) {
            res.header('x-auth', token)
          } else {
            console.error('No Auth token generated')
          }
          res.status(200).send(user)
        })
        .catch(err => {
          res.status(403).send('Wrong credentials')
        })
    } else {
      const token = req.header('x-auth')
      if (token) {
        // login by Auth Token
        User.findByToken(token)
          .then(user => {
            if (!user) {
              res.status(403).send('Wrong Auth Token')
            } else {
              res.status(200).send(user)
            }
          })
          .catch(err => {
            if (err == 403) {
              res.status(403).send('Invalid token')
            } else {
              worstScenario(err, res)
            }
          })
      } else {
        res.status(403).send('Access denied')
      }
    }
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
