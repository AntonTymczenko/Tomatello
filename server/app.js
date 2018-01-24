// dependencies:
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors')

// configuration:
require('dotenv').config()
const {NODE_ENV, PORT, URL, MONGODB_URI} = process.env

// connect to database:
require('./mongoose')(MONGODB_URI)

// middleware:
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// routes:
const routes = require('./routes')
app.use('/', routes)

// fire application:
app.listen(PORT, () => console.log(`Your application \
is running in ${NODE_ENV} mode here: ${URL}:${PORT}`))
