'use strict';
const express = require('express');
const path = require('path');
const middleware = require('../middleware');
const bodyParser = require('body-parser');
const routes = require('../routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




module.exports = app;