var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgresql',
    password : 'postgresql',
    database : 'converge',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});