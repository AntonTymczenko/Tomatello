const {User, Board, List, Task} = require('../models')

module.exports = {
  hasAccessToBoard (req, res, next) {
    if (true) {
      next()
    } else {
      res.status(403).send({error: 'Access denied'})
    }
  }
}
