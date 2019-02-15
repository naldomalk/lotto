'use strict';

const config = {
        fields : 'User, Birth, Phone, Email, Password',
        props : {
                'Password':{type:'password',req:true},
                1:{1:1}
            },

        teste : async(req, res, next) => {
            res.send("teste");
        }
}

exports.module = {
    // register user
    post : async(req, res, next) => {
        let fields = config.fields;
        let values = fn.check_post(config, req);

        console.log(fields);

        let SQL = `INSERT INTO users (${fields}) VALUES (?)`;

        conn.query(SQL, [values], function(error, results, fields){
            if(error) 
            res.status(400).json(error);
            else
            res.json(results);
        });
    },
    // logon user
    get : async(req, res, next) => {
        let reconfig = Object.assign({}, config);
        reconfig.fields = 'Email, Password'; 

        let values = fn.check_post(reconfig,req); 

        let SQL = `SELECT *
                    FROM users U 
                    WHERE U.Email = ? 
                    AND U.Password = ?`;

        var query = conn.query(SQL, values, function(error, results, fields){
            if(error) 
            res.status(400).json(error);
            else{
               if(results.length==0){
                   res.status(401).send('erro');
               }else{
                   conn.query(`INSERT INTO users_sessions () VALUES()`, function(error, results, fields){

                   })
               }
            }
            
        });
        console.log(query.sql);
    },
    // logoff user
    delete : async(req, res, next) => {
        var SQL = `DELETE FROM users_sessions UU 
                    WHERE UU.IDUser = ?`;

        conn.query(SQL, function(error, results, fields){
            if(error) 
            res.json(error);
            else
            res.json(results);
        });
    }
}