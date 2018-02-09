const {User, Board, List, Task} = require('../models')
const {ObjectID} = require('mongodb')

const {notAuth, accessDenied} = require('../errors.json')

const authenticated = (req, res, next) => {
  const token = req.header('x-auth')
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject()
      }
      req.user = user
      next()
    })
    .catch(err => {
      res.status(403).send(accessDenied)
    })
}

const authorizedUser = (req, res, next) => {
  authenticated(req, res, () => {
    if (ObjectID.isValid(req.params.id)
      && ObjectID.isValid(req.user._id)
      && req.params.id.toString() === req.user._id.toString()
    ){
      next()
    } else {
      res.status(401).send(notAuth)
    }
  })
}

module.exports = {
  authenticated,
  authorizedUser
}
