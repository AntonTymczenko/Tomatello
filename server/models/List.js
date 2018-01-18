const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  listName: {
    type: String,
    required: false,
    trim: true
  },
  tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
  }]
})

module.exports = mongoose.model('List', ListSchema)
