const {ObjectID} = require('mongodb')

const {User, Board, List, Task} = require('../models')

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

const resetAllCollections = async () => {
  try {
    await User.remove({})
    await Board.remove({})
    await List.remove({})
    await Task.remove({})
    console.log('Removed all database collections')
  } catch (err) {
    console.log(err)
  }
}

const populateList = async list => {
  const listSaved = await List(list).save()
  populateTasks(listSaved)
}

const populateTasks = list => {
  const tasksToReturn = []
  tasks.map(task => tasksToReturn.push(new Task(task).save()))
  Promise.all(tasksToReturn)
    .then(() => {
      tasks.map(task => {
        list.tasks.push(task._id)
      })
      list.save()
      console.log(`  + list "${list.listName}"`)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = async () => {
  console.log('Running /seed/index.js')
  await resetAllCollections()
  await populateList(list)
}
