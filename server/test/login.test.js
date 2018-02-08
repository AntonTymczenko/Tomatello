const app = require('../app'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  {resetAllCollections, users} = require('../seed'),
  errors = require('../errors.json'),
  jwt = require('jsonwebtoken'),
  JWT_SECRET = process.env.JWT_SECRET

chai.use(chaiHttp)

before('Pre-test DB reset', resetAllCollections)
const user = users[0]

describe('Sign-up route in API', () => {
  const path = '/signup'

  it(`should register and respond with
        status 200,
        body (_id, publicName, boards)
        give AuthToken in headers`, done => {
    chai.request(app)
      .post(path)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.all.keys('_id', 'publicName', 'boards', 'userpic')
        res.should.have.header('x-auth')
        jwt.decode(res.headers['x-auth'])._id
          .should.be.eql(res.body._id)
        done()
      })
  })

  it('should not register user with existing login', done => {
    chai.request(app)
      .post(path)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.be.eql(errors.loginRegistered)
        done()
      })
  })

  it('should not register user without login', done => {
    chai.request(app)
      .post(path)
      .send({password: 'some-legit-password'})
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.be.eql(errors.loginRequired)
        done()
      })
  })

  it('should not register user without password', done => {
    chai.request(app)
      .post(path)
      .send({login: 'some-legit-login'})
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.be.eql(errors.passwordRequired)
        done()
      })
  })
})

describe('Login route in API', () => {
  const path = '/login'
  let token = ''

  it(`should login by credentials (login & password) and
        have authToken in headers`, done => {
    chai.request(app)
      .post(path)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.should.have.header('x-auth')
        jwt.decode(res.headers['x-auth'])._id
          .should.be.eql(res.body._id)
        done()
      })
  })

  it('should respond 403 to empty request', done => {
    chai.request(app)
      .post(path)
      .send({})
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body.should.be.eql(errors.accessDenied)
        done()
      })
  })

  it('should respond 403 to wrong login', done => {
    chai.request(app)
      .post(path)
      .send({
        login: 'some-non-existing-login',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body.should.be.eql(errors.wrongCredentials)
        done()
      })
  })

  it('should respond 403 if password is wrong', done => {
    chai.request(app)
      .post(path)
      .send({
        login: user.login,
        password: 'some-wrong-password'
      })
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body.should.be.eql(errors.wrongCredentials)
        done()
      })
  })
})
