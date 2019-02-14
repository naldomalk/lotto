module.exports = {
    check_user : function(req, res, next){
        var Token = req.get('Token');

        if (!Token) return res.status(401).send({ auth: false, message: 'Token não informado.' });
  
        if (Token!=="token-teste") return res.status(500).send({ auth: false, message: 'Token não autenticado.' });

        system.Logon = true;
        system.IDUser = 1; // ### temporario
        system.post = req.params;

        next();
    }
}