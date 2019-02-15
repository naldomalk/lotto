'use strict';

const config = {
        fields : 'Email, Password',
        props : {
                'Password':{type:'password',req:true},
                1:{1:1}
            }
}

exports.module = {
    post : async(req, res, next) => {
        let reconfig = Object.assign({}, config);
        let values = fn.check_post(reconfig,req); 

        let SQL = `SELECT U.IDUser, MD5(CONCAT(U.IDUser,NOW())) AS Token
                    FROM users U 
                    WHERE U.Email = ? 
                    AND U.Password = ?`;

        var query = conn.query(SQL, values, function(error, results, fields){
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
                        :res.json(`{Token:${Token}}`);
                   })
               }
            }
            
        });
        console.log(query.sql);
    },
    delete : async(req, res, next) => {
        let SQL = `DELETE FROM users_sessions 
                    WHERE Token = ?`;

        let Token = req.get('Token');

        conn.query(SQL, [Token], function(error, results, fields){
            if(error) 
            res.status(400).json(error);
            else
            res.send('{Logoff:true}');
        });
    }
}