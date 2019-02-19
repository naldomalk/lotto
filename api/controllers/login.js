'use strict';

const config = {
    table : 'users',
    fields : 'User, Phone, Birth, Email, Password',
    id : 'IDUser',
    props : {
            'Password':{type:'password',req:true},
            1:{1:1}
        }
}

exports.module = {
    get : async(req, res, next) => { 

        let ID = system.ID;

        let SQL = `SELECT 2 AS ID`; // ### temporário

        conn.query(SQL, function(error, results, fields){
            (error)
            ?res.status(400).json(error)
            :res.json(results);
        });
    },
    post : async(req, res, next) => {
        
        let posts = fn.check_post(config, req);

        let SQL = `INSERT INTO ${config.table} (${config.fields}) VALUES (?)`;

        conn.query(SQL, [posts], function(error, results, fields){
            (error)?res.status(400).json(error)
            :res.json(results);
        });
    },
    put : async(req, res, next) => {

        let reconfig = Object.assign({}, config); 
        
        reconfig.fields = 'Email, Password';

        let posts = fn.check_post(reconfig,req); 

        let SQL = `SELECT U.IDUser, MD5(CONCAT(U.IDUser,NOW())) AS Token
                    FROM users U 
                    WHERE U.Email = ? 
                    AND U.Password = ?`; //console.log(posts);

        conn.query(SQL, posts, function(error, results, fields){
            if(error) 
                res.status(400).json(error);
            else{
               if(results.length==0){
                   res.status(401).send('Erro login');
               }else{
                   let IDUser = results[0]['IDUser'];
                   let Token = results[0]['Token'];

                   let SQL = `INSERT INTO users_sessions (IDUser,Token) VALUES(?,?)`;

                   conn.query(SQL, [IDUser, Token], function(error){
                        (error)?res.status(400).json(error)
                        :res.send(`{"Token":"${Token}"}`);
                   })
               }
            }
            
        });
    },
    delete : async(req, res, next) => {
        let Token = req.get('Token');

        let SQL = `DELETE FROM users_sessions 
                    WHERE Token = ?`;

        conn.query(SQL, [Token], function(error, results, fields){
            if(error) 
            res.status(400).json(error);
            else
            res.send('{Logoff:true}');
        });
    }
}