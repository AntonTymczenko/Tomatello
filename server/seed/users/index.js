const fs = require('fs'),
  pattern = /\.json$/,
  users = []

fs
  .readdirSync(__dirname)
  .filter(file => (file !== 'index.js') && (pattern.test(file)))
  .forEach(file => {
    users.push(require('./' + file))
  })

module.exports = users
