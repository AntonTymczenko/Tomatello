// dependencies:
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors')

// models:
const {List, Task} = require('./models')

// configuration:
require('dotenv').config()
const mode = process.env.NODE_ENV || 'development',
  port = process.env.PORT || '8081',
  url = process.env.URL || 'http://localhost'

// middleware:
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// database:
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const dburl = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/turbo-trello'
console.log('connecting to database ' + dburl)
mongoose.connect(dburl, {useMongoClient: true})

// routes:

// reset and seed database:
app.delete('/reset', (req, res) => {
  require('./seed')
  res.send('Database reset')
})

app.get('/list', (req, res) => {
  List.findOne({})
  .populate('tasks', '_id task done')
  .exec((err, foundList) => {
    if (err) {
      console.log(err)
    } else {
      res.send(foundList)
    }
  })
})

// fire application:
app.listen(port, ()=>{
  console.log(`Your application is running in ${mode} mode here: ${url}:${port}`)
})
