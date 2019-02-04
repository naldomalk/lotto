module.exports = {
    bd_query : function(SQL, req, res){

        //sistema.checa_usuario(req, res);

        conn.query(SQL, function(error, results, fields){
            if(error) 
            res.json(error);
            else
            res.json(results);
        });
  }
}