'use strict';

const config = {
    table : 'bets',
    fields : 'IDUser, IDGame',
    id : 'IDBet',
    props : {
            'IDUser':{backend:true},
            1:{1:1}
        }
}

exports.module = {
    get : async(req, res, next) => { 

        let ID = system.ID;

        let SQL = `SELECT TB.IDBet, TB.IDGame, TB.DateTime, TB.Status
                    FROM ${config.table} TB 
                    WHERE 1 = 1
                    AND TB.IDUser = ${system.IDUser}
                    ORDER BY CASE WHEN TB.${config.id} = ${ID} THEN 0 ELSE 1 END`;

        conn.query(SQL, function(error, results, fields){
            (error)
            ?res.status(400).json(error)
            :res.json(results);
        });
    },

    post : async(req, res, next) => {

        let valid = [];

        valid['IDUser'] = system.IDUser;
        valid['IDGame'] = 1; // ### tempoário...

        let posts = fn.check_post(config, req, valid);
    
        let SQL = `INSERT INTO ${config.table} (${config.fields}) VALUES (?)`;

        conn.query(SQL, [posts], function (error, results, fields){ 
            if(error){
                res.status(400).send(error);
            } else {
                let posts = req.body || {};
                let total = 8;
                
                for(var i=1; i<=total; i++){
                    let Numero = req.body['num_'+i];
                    let SQL = `INSERT INTO bets_numbers (IDBet,Number,Star) 
                                VALUES (
                                        (SELECT IDBet FROM bets WHERE IDUser = ${system.IDUser} ORDER BY IDBet DESC LIMIT 1), 
                                        ${Numero},
                                        ${(i>6)?1:0}
                                        )`;
                    
                    conn.query(SQL, function (error, results, fields){ if(error) i=1000; });
                }
            
                res.send(`{Numbers:${i-1},Total:${total}}`);
            }
        })
    }
}