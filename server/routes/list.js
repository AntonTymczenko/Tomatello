const {Board, List} = require('../models')

const {authenticated} = require('../middleware')

const {notModified, notAuth, notFound} = require('../errors.json')

module.exports = (prefix, router) => {
  // list CREATE:
  router.post(`${prefix}/new`, authenticated, async (req, res) => {
    const _user = req.user._id
    const {listName, _board} = req.body,
      listToSave = {listName, _user, _board}
    try {
      const board = await Board.findById(_board)
      if (board._user.toString() !== _user.toString()){
        res.status(401).send(notAuth)
      } else {
        const list = await List.create(listToSave)
        board.lists.push(list._id)
        await Board.findByIdAndUpdate(board._id, {lists: board.lists})
        res.status(200).send(list._id)
      }
    } catch (err) {
      console.log(err)
      res.status(304).send(notModified)
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
        res.status(404).send(notFound)
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
        res.status(304).send(notModified)
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
      res.status(304).send(notModified)
    }
  })
}
