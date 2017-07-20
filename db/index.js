'use strict';
const knex = require('knex')(require('./knexfile'));
const db = require('bookshelf')(knex);
db.plugin('registry'); // https://github.com/bookshelf/bookshelf/wiki/Plugin:-Model-Registry

module.exports = db;