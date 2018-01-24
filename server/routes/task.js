const {List, Task} = require('../models')

module.exports = (prefix, router) => {
  // task CREATE:
  router.post(`${prefix}/new`, (req, res) => {
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
  router.put(`${prefix}/:id`, (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedTask => {
        res.send(updatedTask)
      })
      .catch(err => {
        res.send(err)
      })
  })

  // task DESTROY:
  router.delete(`${prefix}/:id`, (req, res) => {
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
}
