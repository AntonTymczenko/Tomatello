const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dburl = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/turbo-trello'
console.log('connecting to database ' + dburl)
mongoose.connect(dburl, {useMongoClient: true})

module.exports = mongoose
