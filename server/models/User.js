const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken')

require('dotenv').config()
const {JWT_SECRET} = process.env

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
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
    default: '',
    trim: true
  },
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }],
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
}, {
  usePushEach: true
})

UserSchema.methods.toJSON = function () {
  const {_id, publicName, userpic} = this
  return {_id, publicName, userpic}
}

UserSchema.methods.giveAuthToken = function () {
  // TODO: add expiration property

  const user = this,
    access = 'auth',
    token = jwt.sign({
      _id: user._id.toString(),
      access
    }, JWT_SECRET).toString()
  user.tokens.push({access, token})
  return user.save().then(() => token)
}

UserSchema.methods.removeAuthToken = function (token) {
  const user = this
  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}

UserSchema.statics.findByToken = function (token) {
  const User = this
  let decoded
  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return Promise.reject(403)
    }
    return Promise.reject(err)
  }
  // TODO: add expiration check

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
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
