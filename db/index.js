'use strict';
let environment = process.env.NODE_ENV || 'development';
let config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const db = require('bookshelf')(knex);
db.plugin('registry'); // https://github.com/bookshelf/bookshelf/wiki/Plugin:-Model-Registry

module.exports = db;