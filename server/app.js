// configuration:
require('dotenv').config()
const {NODE_ENV, PORT, URL, MONGODB_URI} = process.env

const express = require('express')
const app = express()

// application-level middleware:
const bodyParser = require('body-parser')
app.use(bodyParser.json())
if (NODE_ENV === 'development') {
  const cors = require('cors')
  app.use(cors({ exposedHeaders: ['x-auth'] }))
}

// connect to database:
require('./mongoose')(MONGODB_URI)

// routes:
const routes = require('./routes')
app.use('/', routes)

// fire application:
app.listen(PORT, () => console.log(`Your application \
is running in ${NODE_ENV} mode here: ${URL}:${PORT}`))
