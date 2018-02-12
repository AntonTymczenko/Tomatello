# Tomatello
your everyday assistant

### Introduction
A cross of Trello boards, time tracking app and your daily habits tracker. Share your business tasks with colleagues, track your daily routines or new habits.

Developers are welcome! Our mission is to make a time/task tracking application which would be useful for every human being in the Galaxy, especially for people who work in a team.

Current production version is [here](https://tomatello.herokuapp.com/)

Public Trello scrum board is [here](https://trello.com/b/oqfUgn3U/tomatello)

### Contributors
[Anton Tymczenko](https://github.com/AntonTymczenko)
contact e-mail: [a.tymczenko@gmail.com](mailto:a.tymczenko@gmail.com?Subject=Tomatello)

## Configuration

#### Configuration for local use
You can specify your own `PORT`, `URL`, path to Mongo database and other
configuration stuff using `.env` file in project's root folder (where the
`package.json` is).

Attention!
YOU NEED THIS FILE for local use in development mode. Example of `.env` file:
```
NODE_ENV="development"
PORT=8081
URL="http://localhost"
MONGODB_URI="mongodb://localhost:27017/tomatello"
JWT_SECRET="secret"
```

#### Configuration for production
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
