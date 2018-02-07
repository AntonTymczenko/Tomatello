const app = require('../app'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  {resetAllCollections, users} = require('../seed'),
  errors = require('../errors.json'),
  jwt = require('jsonwebtoken'),
  JWT_SECRET = process.env.JWT_SECRET

chai.use(chaiHttp)

before(resetAllCollections)

describe('Sign-up route in API', () => {
  const path = '/signup'

  it('should register a proper user', done => {
    chai.request(app)
      .post(path)
      .send(users[0])
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('should not register user with existing login', done => {
    chai.request(app)
      .post(path)
      .send(users[0])
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.be.eql(errors.loginRegistered)
        done()
      })
  })
})
