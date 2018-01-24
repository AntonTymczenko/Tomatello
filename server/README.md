# Turbo Trello

## configuration
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

## Usage
`npm run seed` to populate database with some dummy data

`npm run dev` to start application
