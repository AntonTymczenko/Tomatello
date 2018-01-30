# Trello clone

## Introduction
<div>
<p> Our mission is to make a time/task tracking application which would be useful for every human being in the Galaxy, especially for people who work in a team.</p>
</div>

### Team
<ul>
  <li><a href="https://github.com/atomasso">Ante Tomas</a> atomasso (Project Manager)</li>
  <li><a href="https://github.com/Dar0n">Ilya</a> Dar0n</li>
  <li><a href="https://github.com/AntonTymczenko">Anton Tymczenko</a> AntonTymczenko</li>
   <li><a href="https://github.com/macrusso">Mac Rusek</a> macrusso</li>
</ul>

## Changelog

### Version 0.0.1
<div>
  <ul>
    <li>Basic wireframes</li>
  </ul>
</div>

### Wireframes
<div>
<p>Wireframes are coming soon...</p>
</div>

### User stories

<div>

| As a user, I can... | Version |
| --- | --- |
| User can login and see boards on the homepage | MVP |
| User can add or remove list on a board | MVP |
| User can add or remove card on a list | MVP |
| User can edit her credentials | MVP |
| User can add other team members to the board | MVP |
| add time tracking | v2 |

</div>

## CLIENT SIDE

> Turbo Trello app

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## SERVER SIDE

#### configuration
You can specify your own `PORT`, `URL`, path to Mongo database and other
configuration stuff using `.env` file in this folder.

Attention! YOU NEED THIS FILE for local use in development mode. In production
you can specify configurations not in this file but accordingly to your provider.

Example of `.env` file:
```
NODE_ENV="development"
PORT=8081
URL="http://localhost"
MONGODB_URI="mongodb://localhost:27017/tomatello"
JWT_SECRET="supersecret"
```

#### Usage
`npm run seed` to populate database with some dummy data

`npm run dev` to start application
