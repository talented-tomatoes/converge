const knex = require('./knexfile.js');
const db = require('bookshelf')(knex);
db.plugin('registry'); // https://github.com/bookshelf/bookshelf/wiki/Plugin:-Model-Registry

module.exports = db;