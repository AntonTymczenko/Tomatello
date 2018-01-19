const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  _list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Task', TaskSchema)
