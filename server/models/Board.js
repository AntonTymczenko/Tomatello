const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  boardName: {
    type: String,
    required: false,
    trim: true
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }]
}, {
  usePushEach: true
})

module.exports = mongoose.model('Board', BoardSchema)
