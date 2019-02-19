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

        let SQL = `SELECT B.IDBet, B.IDGame, B.DateTime, B.Status,
                        (SELECT GROUP_CONCAT(' ',BN.Number) FROM bets_numbers BN WHERE BN.IDBet = B.IDBet GROUP BY BN.IDBet) as My_Numbers,
                        (SELECT GROUP_CONCAT(BN2.Number ORDER BY CASE WHEN BN2.IDBet = B.IDBet THEN 0 ELSE 1 END, BN2.IDBet, BN2.NUMBER ASC ) 
                            FROM bets B2 
                            INNER JOIN bets_numbers BN2 on BN2.IDBet = B2.IDBet
                            WHERE B2.IDBet_Group = B.IDBet_Group AND (B2.IDBet_Group <> 0 OR B2.IDBet = B.IDBet)
                            GROUP BY B2.IDBet_Group 
                        ) as Numbers
                    FROM bets B 
                    WHERE 1 = 1
                    AND B.IDUser = ${system.IDUser}
                    ORDER BY CASE WHEN B.${config.id} = ${ID} THEN 0 ELSE 1 END, B.${config.id} DESC`;

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
            
                res.status(200).json(`{Numbers:${i-1},Total:${total}}`);
            }
        })
    }
}