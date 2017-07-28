'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var router = require('./routes/routes.js');

const app = express();
app.use(express.static(path.join(__dirname, '../webApp/react-client/dist')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', router);
module.exports = app;