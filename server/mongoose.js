const mongoose = require('mongoose'),
  options = {
    useMongoClient: true
  }
mongoose.Promise = global.Promise

module.exports = dburl => {
  mongoose.connect(dburl, options)
    .then(() => console.log(`Connected to database ${dburl}`))
    .catch(() => {
      console.error('Error: The server was not able to connect to DB')
      process.exit(1)
    })
}
