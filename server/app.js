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
  url = process.env.URL || 'http://localhost'

// middleware:
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// database:
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const dburl = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/turbo-trello'
console.log('connecting to database ' + dburl)
mongoose.connect(dburl, {useMongoClient: true})

// routes:

// reset and seed database:
app.delete('/reset', (req, res) => {
  if (mode == 'development') {
    require('./seed')()
    res.status(200).send('Database reset done')
  } else {
    res.status(403).send('Can\'t do this in non-development mode')
  }
})

// Signup

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
      console.log(`send user: ${userToSend._id} ${userToSend.boards}`)
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
      console.log(err)
      res.status(403).send(err.message)
    })
})

// board SHOW:
app.get('/board/:id', (req, res) => {
  Board.findById(req.params.id)
    .then(foundBoard => {
      res.send(foundBoard)
    })
    .catch(err => {
      console.log(err)
    })
})

// list SHOW:
app.get('/list/:id', (req, res) => {
  List.findById(req.params.id)
    .populate('tasks', '_id task done')
    .then(foundList => {
      res.send(foundList)
    })
    .catch(err => {
      console.log(err)
    })
})

// list UPDATE:
app.put('/list/:id', (req, res) => {
  List.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedList => {
      res.status(200).send(updatedList)
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
