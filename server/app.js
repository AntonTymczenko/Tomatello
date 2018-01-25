// configuration:
require('dotenv').config()
const {NODE_ENV, PORT, URL, MONGODB_URI} = process.env

// connect to database:
require('./mongoose')(MONGODB_URI)

const app = require('express')()

// application-level middleware:
const bodyParser = require('body-parser'),
  cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

// routes:
const routes = require('./routes')
app.use('/', routes)

// fire application:
app.listen(PORT, () => console.log(`Your application \
is running in ${NODE_ENV} mode here: ${URL}:${PORT}`))
