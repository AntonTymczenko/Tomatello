// configuration:
require('dotenv').config()
const {NODE_ENV, PORT, URL, MONGODB_URI} = process.env

const app = require('express')()

// application-level middleware:
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors({ exposedHeaders: ['x-auth'] }))
app.use(bodyParser.json())

// connect to database:
require('./mongoose')(MONGODB_URI)

// routes:
const routes = require('./routes')
app.use('/', routes)

// fire application:
app.listen(PORT, () => console.log(`Your application \
is running in ${NODE_ENV} mode here: ${URL}:${PORT}`))
