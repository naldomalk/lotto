'use strict';

exports.get = async(req, res, next) => {
    //global.fn.bd_query('SELECT * FROM bets', req, res);
    conn.query('select * from bets', function(error, results, fields){
        if(error) 
        res.json(error);
        else
        res.json(results);
    });
}

exports.post = async(req, res, next) => {
    var IDUsuario   = req.body.IDUsuario;
    var IDJogo      = req.body.IDJogo;
    sistema.post.IDUsuario  = IDUsuario; //sistema.IDUsuario; // ### converter em funcao dinamica por modulo
    sistema.post.IDJogo     = IDJogo;

    var SQL = 'INSERT INTO bets (IDUsuario, IDJogo) VALUES (?,?)';
    conn.query(SQL, [IDUsuario, IDJogo], function (error, results, fields){ 
        console.log(fields);
        if(error) return console.log(error);
        else return console.log(results);
    })

    for(var i=1; i<=8; i++){

        var Numero = req.query['num_'+i];
        var SQL = `INSERT INTO bets_numbers (IDBet,Number) 
                VALUES (
                        (SELECT IDBet FROM bets WHERE IDUsuario = ${IDUsuario} ORDER BY IDBet DESC LIMIT 1), 
                        ${Numero}
                        )`;
        
        conn.query(SQL, sistema.post, function (error, results, fields){ if(error) return console.log(error);  });
    }

    conn.end();

    res.send("Teste: "+SQL);
}