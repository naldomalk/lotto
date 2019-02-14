'use strict';

var config = {
    fields : 'User, Birth, Phone, Email, Password',
    props : {
            'Password':{type:'password',req:true},
            1:{1:1}
        }
}

// register user
exports.post = async(req, res, next) => {
    var fields = config.fields;
    var values = fn.check_post(config, req);

    var SQL = `INSERT INTO users (${fields}) VALUES (?)`;

    conn.query(SQL, [values], function(error, results, fields){
        if(error) 
        res.status(400).json(error);
        else
        res.json(results);
    });
}

// logon user
exports.get = async(req, res, next) => {
    var fields = 'Email, Password'; //config.fields = fields;

    var values = fn.check_post(config,req); 

    var SQL = `SELECT * 
                FROM users U 
                WHERE U.Email = ? 
                AND U.Password = ?`;

    conn.query(SQL, values, function(error, results, fields){
        if(error) 
        res.status(400).json(error);
        else
        res.json(results);
    });
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