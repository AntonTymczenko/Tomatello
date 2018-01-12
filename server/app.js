// dependencies:
const express = require('express'),
  bodyParser = require('body-parser')

// models:
const {List, Task} = require('./models')

// configuration:
require('dotenv').config()
const mode = process.env.NODE_ENV || 'development',
  port = process.env.PORT || '8081',
  url = process.env.URL || 'http://localhost'

// middleware:
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

// database:
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const dburl = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/turbo-trello'
console.log('connecting to database ' + dburl)
mongoose.connect(dburl, {useMongoClient: true})

// seeding:
require('./seed')

// routes:
app.get('/', (req, res) => {
  res.send('Hello World! This is Turbo Trello App')
})

// fire application:
app.listen(port, ()=>{
  console.log(`Your application is running in ${mode} mode here: ${url}:${port}`)
})
