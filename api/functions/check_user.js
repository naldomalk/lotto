module.exports = {
    check_user : function(req, res, next){
        
        let Token = req.get('Token');
        
        system.Logon = false;
        system.post  = req.params;
        system.ID    = req.body.ID || 0;

        console.log(Token);

        if (!Token) return res.status(401).send({ auth: false, message: 'Token não informado.' });

        let SQL = `SELECT * FROM users_sessions WHERE Token = ?`;

        conn.query(SQL, [Token], function(error, results, fields){
            if(error) {
                res.status(400).json(error);
            }else{
                if (results.length==0) {
                    res.status(500).send({ auth: false, message: 'ERRO: Token não autenticado.' }); 
                    console.log('teste');
                    return;
                }else{
                    system.Logon    = true;
                    system.IDUser   = results[0]['IDUser'];

                    next();
                }
            }
        });
    }
}