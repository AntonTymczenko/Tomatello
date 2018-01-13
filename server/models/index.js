const fs = require('fs'),
  path = require('path'),
  models = {}

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    models[path.basename(file, path.extname(file))] = require('./' + file)
  })

module.exports = models
