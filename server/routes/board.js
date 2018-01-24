const {User, Board} = require('../models')

module.exports = (prefix, router) => {
  // board CREATE:
  router.post(`${prefix}/new`, (req, res) => {
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
  router.get('/board/:id', (req, res) => {
    Board.findById(req.params.id)
      .then(foundBoard => {
        res.status(200).send(foundBoard)
      })
      .catch(err => {
        res.status(404).send(err)
      })
  })

  // board UPDATE:
  router.put('/board/:id', (req, res) => {
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
  router.delete('/board/:id', (req, res) => {
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
}
