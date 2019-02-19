'use strict'

// version 1.0.4

global.conn = require('./connection');
global.system = require('./functions/check_user');
global.fn = require('./functions/main');

var cors = require('cors')

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

//const port  = 1958;
const port = process.env.PORT; 
const app   = express();

app.set('port',port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const server = http.createServer(app);

const routeIndex    = require('./routes/index');
const routeLogin    = require('./routes/login');
const routeBet      = require('./routes/bet');

app.use('/', routeIndex);
app.use('/login', routeLogin);
app.use('/bet', system.check_user, routeBet);

server.listen(port);

module.exports = app;

console.log('Api run...');