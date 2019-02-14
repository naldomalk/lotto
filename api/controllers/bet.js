'use strict';

exports.get = async(req, res, next) => {
    //global.fn.bd_query('SELECT * FROM bets', req, res);
    conn.query('SELECT * FROM bets B WHERE B.IDUser = ?', function(error, results, fields){
        if(error) 
        res.json(error);
        else
        res.json(results);
    });
}

exports.post = async(req, res, next) => {
    var IDUser   = req.body.IDUser;
    var IDJogo   = req.body.IDGame;
    system.post.IDUser  = IDUser; //sistema.IDUsuario; // ### converter em funcao dinamica por modulo
    system.post.IDGame  = IDGame;

    var SQL = 'INSERT INTO bets (IDUsuario, IDJogo) VALUES (?,?)';
    conn.query(SQL, [IDUser, IDGame], function (error, results, fields){ 
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
        
        conn.query(SQL, system.post, function (error, results, fields){ if(error) return console.log(error);  });
    }

    conn.end();

    res.send("Teste: "+SQL);
}