const {User} = require('../models')

module.exports = (prefix, router) => {
  // signup
  router.post('/signup', (req, res) => {
    const {login, password} = req.body
    User.create({login, password, boards: []})
      .then(user => {
        if (!user) {
          throw new Error('Not saved')
        }
        const userToSend = {
          _id: user._id,
          boards: user.boards
        }
        res.status(200).send(userToSend)
      })
      .catch(err => {
        console.log(err)
        res.status(304).send(err)
      })
  })

  // login
  router.post('/login', (req, res) => {
    const {login, password} = req.body
    User.findOne({login, password})
      .then(foundUser => {
        if (foundUser) {
          res.status(200).send(foundUser)
        } else {
          throw new Error('Wrong credentials')
        }
      })
      .catch(err => {
        res.status(403).send(err.message)
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
