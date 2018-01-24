// dependencies:
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors')

// models:
const {User, Board, List, Task} = require('./models')

// configuration:
require('dotenv').config()
const mode = process.env.NODE_ENV || 'development',
  port = process.env.PORT || '8081',
  url = process.env.URL || 'http://localhost',
  mongoose = require('./mongoose')

// middleware:
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// routes:

// signup
app.post('/signup', (req, res) => {
  const {login, password} = req.body
  User.create({login, password, boards: []})
    .then(user => {
      if (!user) {
        throw new Error('Not saved')
      }
      const userToSend = {
        _id: user._id,
        boards: user.boards
      }
      res.status(200).send(userToSend)
    })
    .catch(err => {
      console.log(err)
      res.status(304).send(err)
    })
})

// login
app.post('/login', (req, res) => {
  const {login, password} = req.body
  User.findOne({login, password})
    .then(foundUser => {
      if (foundUser) {
        res.status(200).send(foundUser)
      } else {
        throw new Error('Wrong credentials')
      }
    })
    .catch(err => {
      res.status(403).send(err.message)
    })
})

// boards INDEX:
app.get('/boards/:userId', (req, res) => {
  User.findById(req.params.userId)
    .populate('boards', '_id _user lists boardName')
    .then(user => {
      res.status(200).send(user.boards)
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

// board CREATE:
app.post('/board/new', (req, res) => {
  const {boardName, _user} = req.body,
    boardToSave = {boardName, _user}
  Board.create(boardToSave)
    .then(async function (board) {
      try {
        const user = await User.findById(board._user)
        user.boards.push(board._id)
        await User.findByIdAndUpdate(user._id, {boards: user.boards})
        return Promise.resolve(board._id)
      } catch (err) {
        return Promise.reject(new Error(err))
      }
    })
    .then(id => {
      res.status(200).send(id)
    })
    .catch(err => {
      console.log(err)
      res.status(304).send(err)
    })
})

// board SHOW:
app.get('/board/:id', (req, res) => {
  Board.findById(req.params.id)
    .then(foundBoard => {
      res.status(200).send(foundBoard)
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

// board UPDATE:
app.put('/board/:id', (req, res) => {
  Board.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedBoard => {
      res.status(200).send(updatedBoard)
    })
    .catch(err => {
      console.log(err)
      res.status(304).send(err)
    })
})

// board DESTROY:
app.delete('/board/:id', (req, res) => {
  Board.findByIdAndRemove(req.params.id)
    .then(async function (board) {
      try {
        const user = await User.findById(board._user)
        user.boards = user.boards.filter(x => x.toString() != board._id.toString())
        await User.findByIdAndUpdate(user._id, {boards: user.boards})
        return Promise.resolve(board._id)
      } catch (err) {
        return Promise.reject(new Error(err))
      }
    })
    .then(id => {
      res.status(200).send(id)
    })
    .catch(err => {
      console.log(err)
      res.status(304).send(err)
    })
})

// list CREATE:
app.post('/list/new', (req, res) => {
  const {listName, _user, _board} = req.body,
    listToSave = {listName, _user, _board}
  List.create(listToSave)
    .then(async function (list) {
      try {
        const board = await Board.findById(list._board)
        board.lists.push(list._id)
        await Board.findByIdAndUpdate(board._id, {lists: board.lists})
        return Promise.resolve(list._id)
      } catch (err) {
        return Promise.reject(new Error(err))
      }
    })
    .then(id => {
      res.status(200).send(id)
    })
    .catch(err => {
      console.log(err)
      res.status(304).send(err)
    })
})

// list SHOW:
app.get('/list/:id', (req, res) => {
  List.findById(req.params.id)
    .populate('tasks', '_id task done')
    .then(foundList => {
      res.status(200).send(foundList)
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

// list UPDATE:
app.put('/list/:id', (req, res) => {
  List.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedList => {
      res.status(200).send(updatedList)
    })
    .catch(err => {
      console.log(err)
      res.status(304).send(err)
    })
})

// list DESTROY:
app.delete('/list/:id', (req, res) => {
  List.findByIdAndRemove(req.params.id)
    .then(async function (list) {
      try {
        const board = await Board.findById(list._board)
        board.lists = board.lists.filter(x => x.toString() != list._id.toString())
        await Board.findByIdAndUpdate(board._id, {lists: board.lists})
        return Promise.resolve(list._id)
      } catch (err) {
        return Promise.reject(new Error(err))
      }
    })
    .then(id => {
      res.status(200).send(id)
    })
    .catch(err => {
      res.status(304).send(err)
    })
})

// task CREATE:
app.post('/task', (req, res) => {
  Task.create(req.body.task)
    .then(async function (task) {
      try {
        const list = await List.findById(task._list)
        list.tasks.push(task._id)
        await List.findByIdAndUpdate(list._id, {tasks: list.tasks})
        return Promise.resolve(task._id)
      } catch (err) {
        return Promise.reject(new Error(err))
      }
    })
    .then(id => {
      res.status(200).send(id)
    })
    .catch(err => {
      console.log(err)
      res.status(304).send(err)
    })
})

// task UPDATE:
app.put('/task/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedTask => {
      res.send(updatedTask)
    })
    .catch(err => {
      res.send(err)
    })
})

// task DESTROY:
app.delete('/task/:id', (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(async function (task) {
      try {
        const list = await List.findById(task._list)
        list.tasks = list.tasks.filter(x => x.toString() != task._id.toString())
        await List.findByIdAndUpdate(list._id, {tasks: list.tasks})
        return Promise.resolve(task._id)
      } catch (err) {
        return Promise.reject(new Error(err))
      }
    })
    .then(id => {
      res.status(200).send(id)
    })
    .catch(err => {
      res.status(304).send(err)
    })
})

// fire application:
app.listen(port, ()=>{
  console.log(`Your application is running in ${mode} mode here: ${url}:${port}`)
})
