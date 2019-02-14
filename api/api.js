'use strict'

global.conn = require('./connection');
global.system = require('./functions/check_user');
global.fn = require('./functions/main');

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app   = express();
const port  = 1958;

app.set('port',port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);

const routeIndex    = require('./routes/index');
const routeLogin    = require('./routes/login');
const routeBet      = require('./routes/bet');

app.use('/', routeIndex);
app.use('/login', routeLogin);
app.use('/bet', routeBet);

server.listen(port);

module.exports = app;

console.log('Api run...');