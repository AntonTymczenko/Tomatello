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

UserSchema.methods.toJSON = function () {
  const user = this.toObject()
  const {_id, publicName, boards, login} = user
  return {_id, publicName, boards, login}
}

UserSchema.statics.findByCredentials = function (login, password) {
  const User = this
  return User.findOne({login})
    .then(user => {
      if (!user) {
        return Promise.reject()
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password)
          .then (res => {
            res ? resolve(user) : reject()
          })
      })
    })
}

UserSchema.pre('save', function (next) {
  const user = this

  if (user.publicName === '' && !user.isModified('publicName')) {
    user.publicName = user.login
  }

  if (user.isModified('password')) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
  }

  next()
})

module.exports = mongoose.model('User', UserSchema)
