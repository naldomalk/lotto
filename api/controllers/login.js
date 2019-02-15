'use strict';

const config = {
        fields : 'User, Birth, Phone, Email, Password',
        props : {
                'Password':{type:'password',req:true},
                1:{1:1}
            }
}

// register user
exports.post = async(req, res, next) => {
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
}

// logon user
exports.get = async(req, res, next) => {
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
        else
        res.send("Total: "+results.length);
    });
    console.log(query.sql);
}

// logoff user
exports.delete = async(req, res, next) => {
    var SQL = `DELETE FROM users_sessions UU 
                WHERE UU.IDUser = ?`;

    conn.query(SQL, function(error, results, fields){
        if(error) 
        res.json(error);
        else
        res.json(results);
    });
}