'use strict'

global.conn = require('./conexao');
const funcoes = require('./funcoes/funcoes_bd');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug');

const app   = express();
const port  = 1958;

app.set('port',port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
const router = express.Router();

app.get('/', (req, res) => res.json({ message: 'Rodando api Lotto!' }));

app.get('/bets', (req, res) =>{
    funcoes.bd_query('SELECT * FROM bets', res);
})

app.post('/register', function(req, res, next) {
    //
});

app.post('/bet', function(req, res, next){
    //var retorno = modulo_executa("PUT", req.params.modulo, req.params.id, 0);
    //res.send(retorno);
})

server.listen(port);

console.log('Api rodando...');

function bd_query2(SQL, res){
  conn.query(SQL, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      //console.log('executou!');
  });
}