const fs = require('fs'),
  path = require('path'),
  pattern = /^[A-Z][A-z]+\.js$/
  models = {}

fs
  .readdirSync(__dirname)
  .filter(file => (file !== 'index.js') && (pattern.test(file)))
  .forEach(file => {
    models[path.basename(file, path.extname(file))] = require('./' + file)
  })

module.exports = models
