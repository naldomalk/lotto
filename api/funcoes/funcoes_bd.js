module.exports = {
    bd_query : function(SQL, res){
        conn.query(SQL, function(error, results, fields){
            if(error) 
            res.json(error);
            else
            res.json(results);
            //console.log('executou!');
        });
  }
}