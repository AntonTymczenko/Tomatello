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
  router.get(`${prefix}/:id`, authenticated, (req, res) => {
    List.findById(req.params.id)
      .populate('tasks', '_id task done')
      .then(list => {
        if (list._user.toString() !== req.user._id.toString()) {
          res.status(401).send(notAuth)
        } else {
          res.status(200).send(list)
        }
      })
      .catch(err => {
        res.status(404).send(notFound)
      })
  })

  // list UPDATE:
  router.put(`${prefix}/:id`, authenticated, async (req, res) => {
    try {
      let list = await List.findById(req.params.id)
      if (list._user.toString() !== req.user._id.toString()) {
        res.status(401).send(notAuth)
      } else {
        list = await List.findByIdAndUpdate(list._id, req.body, {new: true})
        res.status(200).send(list._id)
      }
    } catch (err) {
      console.log(err)
      res.status(304).send(notModified)
    }
  })

  // list DESTROY:
  router.delete(`${prefix}/:id`, authenticated, async (req, res) => {
    try {
      let list = await List.findById(req.params.id)
      if (list._user.toString() !== req.user._id.toString()) {
        res.status(401).send(notAuth)
      } else {
        list = await List.findByIdAndRemove(list._id)
        const board = await Board.findById(list._board)
        board.lists = board.lists.filter(x => x.toString() != list._id.toString())
        await Board.findByIdAndUpdate(board._id, {lists: board.lists})
        res.status(200).send(list._id)
      }
    } catch (err) {
      res.status(304).send(notModified)
    }
  })
}
