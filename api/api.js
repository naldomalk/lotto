'use strict'

global.conn = require('./connection');
global.system = require('./functions/check_user');

const fn = require('./funcoes/functions');
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
const routeBet      = require('./routes/bet');
const routeLogin      = require('./routes/login');

app.use('/', routeIndex);
app.use('/bet', routeBet);
app.use('/login', routeLogin);

server.listen(port);

module.exports = app;

console.log('Api run...');