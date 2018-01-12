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

const populateList = () => {
  List.remove({})
    .then(() => {
      return new List(list).save()
    })
    .then(listSaved => {
      populateTasks(listSaved)
    })
    .catch(err => {
      console.log(err)
    })
}

const populateTasks = list => {
  Task.remove({})
    .then(() => {
      const tasksToReturn = []
      tasks.map(task => {
        tasksToReturn.push(new Task(task).save())
      })
      return Promise.all(tasksToReturn)
    })
    .then(() => {
      tasks.map(task => {
        list.tasks.push(task._id)
      })
      list.save()
    })
    .catch(err => {
      console.log(err)
    })
}

populateList()
