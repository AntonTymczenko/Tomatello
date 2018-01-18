const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  publicName: {
    type: String,
    required: false,
    default: '',
    trim: true
  },
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }]
})

module.exports = mongoose.model('User', UserSchema)
