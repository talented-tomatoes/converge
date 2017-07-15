const local = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'converge'
};
const dbConfig = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL || local
};
const knex = require('knex')(dbConfig);

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;