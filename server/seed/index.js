const {User, Board, List, Task} = require('../models')
let log = false

const resetAllCollections = async () => {
  try {
    await User.remove({})
    await Board.remove({})
    await List.remove({})
    await Task.remove({})
    log ? console.log('Removed all database collections') : null
  } catch (err) {
    console.log(err)
  }
}

const shortenId = id => id.toString().substring(20)

const populateUsers = () => {
  const users = require('./users')
  try {
    for (let user of users) {
      populateUser(user)
    }
  } catch (err) {
    console.log(err)
  }
}

const populateUser = async (user) => {
  const {login, password, publicName, userpic} = user
  const userSaved = await User({login, password, publicName, userpic}).save()
  const id = shortenId(userSaved._id)
  log ? console.log(`+ user "${userSaved.publicName}" ..${id}`) : null
  await populateBoards(userSaved._id, user.boards)
  return new Promise((resolve, reject) => {
    resolve()
  })
}

const populateBoards = async (_user, boards) => {
  try {
    const boardsToReturn = []
    for (let board of boards) {
      const {boardName} = board
      const boardSaved = await Board({boardName, _user}).save()
      const id = shortenId(boardSaved._id)
      log ? console.log(`  + board "${boardSaved.boardName}" ..${id}`) : null
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
      log ? console.log(`    + list "${listSaved.listName}" ..${id}`) : null
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
      log ? console.log(`      + task "${taskSaved.task}" ..${id}`) : null
      tasksToReturn.push(taskSaved._id)
    }
    await registerTasksToList(_list, tasksToReturn)
  } catch (err) {
    console.log(err)
  }
}

const registerTasksToList = async (_list, tasks) => {
  try {
    log ? console.log(`writing tasks ${tasks
      .map(id => `..${shortenId(id)}`)
      .reduce((x,y)=> `${x}, ${y}`)
    } to list ..${shortenId(_list)}`) : null
    await List.findByIdAndUpdate(_list, {tasks})
  } catch (err) {
    console.log(err)
  }
}

const registerListsToBoard = async (_board, lists) => {
  try {
    log ? console.log(`writing lists ${lists
      .map(id => `..${shortenId(id)}`)
      .reduce((x,y)=> `${x}, ${y}`)
    } to board ..${shortenId(_board)}`) : null
    await Board.findByIdAndUpdate(_board, {lists})
  } catch (err) {
    console.log(err)
  }
}

const registerBoardsToUser = async (_user, boards) => {
  try {
    log ? console.log(`writing boards ${boards
      .map(id => `..${shortenId(id)}`)
      .reduce((x,y)=> `${x}, ${y}`)
    } to user ..${shortenId(_user)}`) : null
    await User.findByIdAndUpdate(_user, {boards})
  } catch (err) {
    console.log(err)
  }
}

const seed = async () => {
  console.log('Running /seed/index.js')
  require('dotenv').config()
  require('../mongoose')(process.env.MONGODB_URI)
  log = true // when running not in tests -- log everything to console

  try {
    await resetAllCollections()
    await populateUsers()
    console.log('Seeding done')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error(`Didn't seed`)
    process.exit(1)
  }
}


module.exports = {
  resetAllCollections,
  populateUser,
  users: require('./users'),
  seed
}
