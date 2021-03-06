const express = require('express'),
  router = express.Router(),
  fs = require('fs'),
  path = require('path'),
  pattern = /^[a-z]+\.js$/

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/dist/index.html'))
})

fs
  .readdirSync(__dirname)
  .filter(file => (file !== 'index.js') && (pattern.test(file)))
  .forEach(file => {
    const name = path.basename(file, path.extname(file))
    require(`./${file}`)(`/${name}`, router)
  })

router.get('*', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '../../client/static/404.html'))
})

module.exports = router
