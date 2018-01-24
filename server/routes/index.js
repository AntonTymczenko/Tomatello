// dependencies:
const express = require('express'),
  router = express.Router()

require('./user')('/user', router)
require('./board')('/board', router)
require('./list')('/list', router)
require('./task')('/task', router)

module.exports = router
