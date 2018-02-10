const app = require('../app'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  {resetAllCollections, populateUsers, users} = require('../seed'),
  errors = require('../errors.json'),
  jwt = require('jsonwebtoken'),
  JWT_SECRET = process.env.JWT_SECRET

chai.use(chaiHttp)

before(() => {
  
})

describe('Board create route', () => {

})

describe('Board read route', () => {

})

describe('Board update route', () => {

})

describe('Board destroy route', () => {

})
