'use strict'

global.conn = require('./conexao');
global.sistema = require('./funcoes/checa_usuario');

const fn = require('./funcoes/funcoes');
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
var routeInclude  = null;

//app.use('/', function(req, res, next){ console.log('teste...'); next(); },routeIndex);

app.use('/', routeIndex);
app.use('/bet', routeBet);

server.listen(port);

module.exports = app;

console.log('Api run...');