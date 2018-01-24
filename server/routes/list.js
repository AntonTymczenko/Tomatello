const {Board, List} = require('../models')

module.exports = (prefix, router) => {
  // list CREATE:
  router.post(`${prefix}/new`, async (req, res) => {
    const {listName, _user, _board} = req.body,
      listToSave = {listName, _user, _board}
    try {
      const list = await List.create(listToSave)
      const board = await Board.findById(list._board)
      board.lists.push(list._id)
      await Board.findByIdAndUpdate(board._id, {lists: board.lists})
      res.status(200).send(list._id)
    } catch (err) {
      console.log(err)
      res.status(304).send(err)
    }
  })

  // list SHOW:
  router.get(`${prefix}/:id`, (req, res) => {
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
  router.put(`${prefix}/:id`, (req, res) => {
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
  router.delete(`${prefix}/:id`, async (req, res) => {
    try {
      const list = await List.findByIdAndRemove(req.params.id)
      const board = await Board.findById(list._board)
      board.lists = board.lists.filter(x => x.toString() != list._id.toString())
      await Board.findByIdAndUpdate(board._id, {lists: board.lists})
      res.status(200).send(list._id)
    } catch (err) {
      res.status(304).send(err)
    }
  })
}
