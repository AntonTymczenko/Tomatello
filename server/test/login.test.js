const app = require('../app'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  {expect} = require('chai'),
  should = chai.should(),
  {resetAllCollections, populateUsers, users} = require('../seed'),
  errors = require('../errors.json')

chai.use(chaiHttp)

before(resetAllCollections)

describe('Sign-up route in API', () => {
  before(populateUsers)
  const path = '/signup'

  it('should register a proper user', done => {
    chai.request(app)
      .post('/signup')
      .send({
        login: 'vasa',
        password: 'pwd'
      })
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
