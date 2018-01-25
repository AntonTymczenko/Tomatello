const {User} = require('../models')

module.exports = (prefix, router) => {
  // signup
  router.post('/signup', (req, res) => {
    const {login, password} = req.body
    User.create({login, password})
      .then(user => {
        if (!user) {
          throw new Error('Not saved')
        }
        const {_id, boards} = user
        res.status(200).send({_id, boards})
      })
      .catch(err => {
        console.log(err)
        res.status(304).send(err)
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
        res.status(403).send('Error: Wrong credentials')
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
