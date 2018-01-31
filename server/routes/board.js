const {User, Board} = require('../models')

const {hasAccessToBoard} = require('../middleware')

module.exports = (prefix, router) => {
  // board CREATE:
  router.post(`${prefix}/new`, async (req, res) => {
    const {boardName, _user} = req.body,
      boardToSave = {boardName, _user}
    try {
      const board = await Board.create(boardToSave)
      const user = await User.findById(board._user)
      user.boards.push(board._id)
      await User.findByIdAndUpdate(user._id, {boards: user.boards})
      res.status(200).send(board._id)
    } catch (err) {
      console.log(err)
      res.status(304).send(err)
    }
  })

  // board SHOW:
  router.get(`${prefix}/:id`, hasAccessToBoard, (req, res) => {
    Board.findById(req.params.id)
      .then(foundBoard => {
        res.status(200).send(foundBoard)
      })
      .catch(err => {
        res.status(404).send(err)
      })
  })

  // board UPDATE:
  router.put(`${prefix}/:id`, (req, res) => {
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
  router.delete(`${prefix}/:id`, async (req, res) => {
    try {
      const board = await Board.findByIdAndRemove(req.params.id)
      const user = await User.findById(board._user)
      user.boards = user.boards.filter(x => x.toString() != board._id.toString())
      await User.findByIdAndUpdate(user._id, {boards: user.boards})
      res.status(200).send(board._id)
    } catch (err) {
      console.log(err)
      res.status(304).send(err)
    }
  })
}
