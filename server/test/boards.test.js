const app = require('../app'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  {resetAllCollections, populateUser, users} = require('../seed'),
  errors = require('../errors.json'),
  jwt = require('jsonwebtoken'),
  JWT_SECRET = process.env.JWT_SECRET,
  {ObjectID} = require('mongodb')

chai.use(chaiHttp)


const user = users[0],
  hacker = users[1]

describe('BOARD ROUTES', () => {
  before(done => {
    resetAllCollections()
      .then(() => {
        chai.request(app).post('/signup')
          .send(user)
          .end((err, res) => {
            user.authToken = res.headers['x-auth']
            user._id = res.body._id
            chai.request(app).post('/signup')
              .send(hacker)
              .end((err, res) => {
                hacker.authToken = res.headers['x-auth']
                hacker._id = res.body._id
                done()
              })
          })
      })
  })

  describe('Board create route', () => {
    const path = '/board/new'
    const board = {boardName: 'Personal board'}

    it('should create a new board and respond with valid ObjectID', done => {
      chai.request(app).post(path)
        .send(board)
        .set('x-auth', user.authToken)
        .end((err, res) => {
          res.should.have.status(200)
          ObjectID.isValid(res.body).should.be.true
          done()
        })
    })

    it('should respond with 403 to no authToken', done => {
      chai.request(app).post(path)
        .send(board)
        .end((err, res) => {
          res.should.have.status(403)
          done()
        })
    })

    it('should respond with 403 to invalid authToken', done => {
      chai.request(app).post(path)
        .send(board)
        .set('x-auth', 'gibberish')
        .end((err, res) => {
          res.should.have.status(403)
          done()
        })
    })
  })

  describe('Board read route', () => {
    const path = '/board/'
    const board = {boardName: 'Some Name'}

    before(done => {
      chai.request(app).post('/board/new')
        .send(board)
        .set('x-auth', user.authToken)
        .end((err, res) => {
          res.should.have.status(200)
          board._id = res.body
          done()
        })
    })

    it('should respond with a proper body', done => {
      chai.request(app).get(path + board._id)
        .set('x-auth', user.authToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.include.keys('_id', 'boardName', '_user', 'lists')
          res.body['_id'].should.eql(board._id)
          res.body['boardName'].should.eql(board.boardName)
          res.body['_user'].should.eql(user._id)
          res.body['lists'].should.be.an('array')
          done()
        })
    })

    it('should respond 403 to no authToken', done => {
      chai.request(app).get(path + board._id)
        .end((err, res) => {
          res.should.have.status(403)
          done()
        })
    })

    it('should respond 403 to invalid authToken', done => {
      chai.request(app).get(path + board._id)
        .set('x-auth', 'gibberishToken')
        .end((err, res) => {
          res.should.have.status(403)
          done()
        })
    })

    it('should respond 401 to not an owner', done => {
      chai.request(app).get(path + board._id)
        .set('x-auth', hacker.authToken)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })

  })

  describe('Board update route', () => {

  })

  describe('Board destroy route', () => {

  })
})
