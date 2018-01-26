const {ObjectID} = require('mongodb')
require('dotenv').config()
require('../mongoose')(process.env.MONGODB_URI)

const {User, Board, List, Task} = require('../models')

const users = require('./users')

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

const shortenId = id => id.toString().substring(20)

const populateUsers = async users => {
  try {
    for (let user of users) {
      const {login, password, publicName, userpic} = user
      const userSaved = await User({login, password, publicName, userpic}).save()
      const id = shortenId(userSaved._id)
      console.log(`+ user "${userSaved.publicName}" ..${id}`)
      await populateBoards(userSaved._id, user.boards)
    }
  } catch (err) {
    console.log(err)
  }
}

const populateBoards = async (_user, boards) => {
  try {
    const boardsToReturn = []
    for (let board of boards) {
      const {boardName} = board
      const boardSaved = await Board({boardName, _user}).save()
      const id = shortenId(boardSaved._id)
      console.log(`  + board "${boardSaved.boardName}" ..${id}`)
      boardsToReturn.push(boardSaved._id)
      await populateLists(_user, boardSaved._id, board.lists)
    }
    await registerBoardsToUser(_user, boardsToReturn)
  } catch (err) {
    console.log(err)
  }
}

const populateLists = async (_user, _board, lists) => {
  try {
    const listsToReturn = []
    for (let list of lists) {
      const {listName} = list
      const listSaved = await List({listName, _user, _board}).save()
      const id = shortenId(listSaved._id)
      console.log(`    + list "${listSaved.listName}" ..${id}`)
      listsToReturn.push(listSaved._id)
      await populateTasks(_user, listSaved._id, list.tasks)
    }
    await registerListsToBoard(_board, listsToReturn)
  } catch (err) {
    console.log(err)
  }
}

const populateTasks = async (_user, _list, tasks) => {
  try {
    const tasksToReturn = []
    for (let task of tasks) {
      const taskSaved = await Task({
        task,
        _user,
        _list,
        done: false
      }).save()
      const id = shortenId(taskSaved._id)
      console.log(`      + task "${taskSaved.task}" ..${id}`)
      tasksToReturn.push(taskSaved._id)
    }
    await registerTasksToList(_list, tasksToReturn)
  } catch (err) {
    console.log(err)
  }
}

const registerTasksToList = async (_list, tasks) => {
  try {
    console.log(`writing tasks ${tasks
      .map(id => `..${shortenId(id)}`)
      .reduce((x,y)=> `${x}, ${y}`)
    } to list ..${shortenId(_list)}`)
    await List.findByIdAndUpdate(_list, {tasks})
  } catch (err) {
    console.log(err)
  }
}

const registerListsToBoard = async (_board, lists) => {
  try {
    console.log(`writing lists ${lists
      .map(id => `..${shortenId(id)}`)
      .reduce((x,y)=> `${x}, ${y}`)
    } to board ..${shortenId(_board)}`)
    await Board.findByIdAndUpdate(_board, {lists})
  } catch (err) {
    console.log(err)
  }
}

const registerBoardsToUser = async (_user, boards) => {
  try {
    console.log(`writing boards ${boards
      .map(id => `..${shortenId(id)}`)
      .reduce((x,y)=> `${x}, ${y}`)
    } to user ..${shortenId(_user)}`)
    await User.findByIdAndUpdate(_user, {boards})
  } catch (err) {
    console.log(err)
  }
}

console.log('Running /seed/index.js')
;(async () => {
  await resetAllCollections()
  await populateUsers(users)
  console.log('Seeding done')
  process.exit(0)
})()
