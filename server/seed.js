const {ObjectID} = require('mongodb')

const {List, Task} = require('./models')

const list = {
  _id: new ObjectID(),
  listName: 'Do today',
  tasks: []
}

const tasks = [{
  _id: new ObjectID(),
  _list: list._id,
  task: 'Walk a dog'
}, {
  _id: new ObjectID,
  _list: list._id,
  task: 'Go groceries',
  done: true
}, {
  _id: new ObjectID,
  _list: list._id,
  task: 'Do dishes'
}]
