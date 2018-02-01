const {User, Board} = require('../models')

const {authenticated} = require('../middleware')

const notAuth = {error: 'Not authorized for this action'},
  notFound = {error: 'Not found'},
  notModified = {error: 'Not modified'}

module.exports = (prefix, router) => {
  // board CREATE:
  router.post(`${prefix}/new`, authenticated, async (req, res) => {
    const {boardName} = req.body,
      _user = req.user._id,
      boardToSave = {boardName, _user}
    try {
      const board = await Board.create(boardToSave)
      const user = await User.findById(board._user)
      user.boards.push(board._id)
      await User.findByIdAndUpdate(user._id, {boards: user.boards})
      res.status(200).send(board._id)
    } catch (err) {
      console.log(err)
      res.status(304).send(notModified)
    }
  })

  // board SHOW:
  router.get(`${prefix}/:id`, authenticated, (req, res) => {
    Board.findById(req.params.id)
      .then(board => {
        if (board._user.toString() === req.user._id.toString()){
          res.status(200).send(board)
        } else {
          res.status(401).send(notAuth)
        }
      })
      .catch(err => {
        res.status(404).send(notFound)
      })
  })

  // board UPDATE:
  router.put(`${prefix}/:id`, authenticated, async (req, res) => {
    try {
      const id = req.params.id
      let board = await Board.findById(id)
      if (board._user.toString() === req.user._id.toString()){
        board = await Board.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).send(board)
      } else {
        res.status(401).send(notAuth)
      }
    } catch (err) {
      console.log(err)
      res.status(304).send(notModified)
    }
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
      res.status(304).send(notModified)
    }
  })
}
