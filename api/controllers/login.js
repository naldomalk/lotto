'use strict';

exports.put = async(req, res, next) => {
    var SQL = `SELECT * 
                FROM usuarios U 
                WHERE Email = ? 
                AND Senha = MD5(?)`;

    conn.query(SQL, function(error, results, fields){
        if(error) 
        res.json(error);
        else
        res.json(results);
    });
}

exports.post = async(req, res, next) => {

}

exports.delete = async(req, res, next) => {
    var SQL = `DELETE FROM usuarios_sessoes 
                WHERE IDusuario = ?`;

    conn.query(SQL, function(error, results, fields){
        if(error) 
        res.json(error);
        else
        res.json(results);
    });
}