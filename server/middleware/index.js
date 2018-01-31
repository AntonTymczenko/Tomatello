const {User, Board, List, Task} = require('../models')
const {ObjectID} = require('mongodb')

const error = [
  {},
  {error: 'Not authorized for this action'},
  {},
  {error: 'Access denied'}
]

const authenticated = (req, res, next) => {
  const token = req.header('x-auth')
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject(403)
      }
      req.user = user
      next()
    })
    .catch(err => {
      res.status(403).send(error[3])
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
      res.status(401).send(error[1])
    }
  })
}

const hasAccessToBoard = (req, res, next) => {
  if (true) {
    next()
  } else {
    res.status(401).send(error[1])
  }
}

module.exports = {
  authorizedUser,
  hasAccessToBoard
}
