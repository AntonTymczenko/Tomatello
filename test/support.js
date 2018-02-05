require('dotenv').config()
process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = `${process.env.MONGODB_URI}-test`
