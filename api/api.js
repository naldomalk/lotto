'use strict'

global.conn = require('./conexao');
global.sistema = require('./funcoes/checa_usuario');

const funcoes = require('./funcoes/funcoes_bd');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app   = express();
const port  = 1958;

app.set('port',port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
const router = express.Router();

app.get('/', (req, res) => res.json({ message: 'Rodando api Lotto!' }));

app.get('/bets', sistema.checa_usuario, (req, res, next) =>{
    funcoes.bd_query('SELECT * FROM bets', req, res);
})

app.post('/bet', sistema.checa_usuario, function(req, res, next) {
   
    sistema.post.IDUsuario  = sistema.IDUsuario; // ### converter em funcao dinamica por modulo
    sistema.post.IDJogo     = 1;

    var SQL = "INSERT INTO bets (IDUsuario,IDJogo) VALUES (?)";

    conn.query(SQL, [sistema.post], function (error, results, fields){ if(error) return console.log(error); });

    for(var i=1;i<=8;i++){
        var Numero = req.query['num_'+i];
        
        var SQL = `INSERT INTO bets_numbers (IDBet,Number) 
        VALUES ((SELECT IDBet FROM bets WHERE IDUsuario = ${sistema.IDUsuario} ORDER BY IDBet DESC LIMIT 1),${Numero})`;
        
        conn.query(SQL, sistema.post, function (error, results, fields){ if(error) return console.log(error);  });
    }

    conn.end();

    res.send("Teste: "+SQL);
});

app.post('/register', function(req, res, next) {
    //
});

app.post('/bet', function(req, res, next){
    //var retorno = modulo_executa("PUT", req.params.modulo, req.params.id, 0);
    //res.send(retorno);
})

server.listen(port);

console.log('Api rodando...');

//conn.query("INSERT INTO teste (DateTime) values(Now())", function(error, results, fields){ });