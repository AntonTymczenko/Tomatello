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

## Configuration

#### Configuration for local use
You can specify your own `PORT`, `URL`, path to Mongo database and other
configuration stuff using `.env` file in this folder.

Attention!
YOU NEED THIS FILE for local use in development mode. Example of `.env` file:
```
NODE_ENV="development"
PORT=8081
URL="http://localhost"
MONGODB_URI="mongodb://localhost:27017/tomatello"
JWT_SECRET="secret"
```

#### Configuration for produciton
In production you can specify configurations not in this file but accordingly
to your provider.

For Heroku use these commands:
```
heroku apps:create tomatello
heroku config:set MONGODB_URI="mongodb://<username>:<password>@<id>.mlab.com:<port>/<dbname>"
heroku config:set JWT_SECRET="secret"
git push heroku master
```

Fill all the fields in MONGODB_URI constant accordingly to your database at Mlab.

## Usage

`npm install` to install all dependencies.

`npm run seed` to populate database with some dummy data.

`npm run dev` to start application locally with Client and Server side in one
prompt.

Use `npm run dev:client` and `npm run dev:server` commands to start Client and
Server in separate prompts.

`npm run build` to build static Client-side files.

`npm run build --report` to build for production and view the bundle analyzer
report.

`npm run start` to start Server just like in production. But you'll have
to specify `NODE_ENV=production` in your `.env` file. To use this command,
you have to run `build` script first.

`npm run unit` run unit tests

`npm run e2e` run e2e tests

`npm test` run all tests
