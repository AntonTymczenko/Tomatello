const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
  userpic: {
    type: String,
    required: false,
    trim: true
  },
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }]
})

UserSchema.pre('save', function (next) {
  let user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) =>{
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('User', UserSchema)
