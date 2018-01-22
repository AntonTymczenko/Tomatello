# Turbo Trello

## Usage
`npm run seed` to populate database with some dummy data
`npm run dev` to start application

## configuration
You can specify your own `PORT`, `URL`, path to Mongo database and other
configuration stuff using `.env` file in this folder.

Example of `.env` file:
```
PORT=8081
MONGODB_URI=mongodb://localhost:27017/tabtracker
JWT_SECRET="supersecret"
```
