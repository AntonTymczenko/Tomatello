const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: false,
    minLength: 1,
    trim: true
  },
  tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
  }]
})

module.exports = mongoose.model('List', ListSchema)
