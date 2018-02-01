const {List, Task} = require('../models')

const {authenticated} = require('../middleware')

const {notModified, notAuth} = require('../errors.json')

module.exports = (prefix, router) => {
  // task CREATE:
  router.post(`${prefix}/new`, authenticated, async (req, res) => {
    try {
      const list = await List.findById(req.body.task._list)
      if (list._user.toString() !== req.user._id.toString()) {
        res.status(401).send(notAuth)
      } else {
        const taskToSave = req.body.task
        taskToSave._user = req.user._id
        const task = await Task.create(taskToSave)
        list.tasks.push(task._id)
        await List.findByIdAndUpdate(list._id, {tasks: list.tasks})
        res.status(200).send(task._id)
      }
    } catch (err) {
      console.log(err)
      res.status(304).send(notModified)
    }
  })

  // task UPDATE:
  router.put(`${prefix}/:id`, authenticated, async (req, res) => {
    try {
      let task = await Task.findById(req.params.id)
      if (task._user.toString() !== req.user._id.toString()) {
        res.status(401).send(notAuth)
      } else {
        task = await Task.findByIdAndUpdate(task.id, req.body, {new: true})
        res.status(200).send(task)
      }
    } catch (err) {
      console.log(err)
      res.status(304).send(notModified)
    }
  })

  // task DESTROY:
  router.delete(`${prefix}/:id`, authenticated, async (req, res) => {
    try {
      let task = await Task.findById(req.params.id)
      const list = await List.findById(task._list)
      if (task._user.toString() !== req.user._id.toString()
        || list._user.toString() !== req.user._id.toString()
      ) {
        res.status(401).send(notAuth)
      } else {
        task = await Task.findByIdAndRemove(task._id)
        list.tasks = list.tasks.filter(x => x.toString() !== task._id.toString())
        await List.findByIdAndUpdate(list._id, {tasks: list.tasks})
        res.status(200).send(task._id)
      }
    } catch (err) {
      console.log(err)
      res.status(304).send(notModified)
    }
  })
}
