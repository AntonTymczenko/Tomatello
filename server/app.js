// dependencies:
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors')

// configuration:
require('dotenv').config()
const mode = process.env.NODE_ENV || 'development',
  port = process.env.PORT || '8081',
  url = process.env.URL || 'http://localhost',
  mongoose = require('./mongoose')

// middleware:
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// routes:
const routes = require('./routes')
app.use('/', routes)

// fire application:
app.listen(port, ()=>{
  console.log(`Your application is running in ${mode} mode here: ${url}:${port}`)
})
