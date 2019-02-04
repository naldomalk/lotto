module.exports = {
    checa_usuario : function(req, res, next){
        var Token = req.get('Token');

        if (!Token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
        if (Token!=="token-teste") return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        sistema.Logado = true;
        sistema.IDUsuario = 1; // ### temporario
        sistema.post = req.params;

        next();
    }
}