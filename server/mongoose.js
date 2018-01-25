const mongoose = require('mongoose'),
  options = {
    useMongoClient: true
  }
mongoose.Promise = global.Promise

module.exports = dburl => {
  mongoose.connect(dburl, options)
    .then(() => console.log(`Connected to database ${dburl}`))
    .catch(err => {
      if (err.message.indexOf('ECONNREFUSED') !== -1) {
        console.error('Error: The server was not able to reach MongoDB')
        process.exit(1)
      } else {
        throw err
      }
    })
}
