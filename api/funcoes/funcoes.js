module.exports = {
    bd_query : function(SQL, req, res){
        conn.query(SQL, function(error, results, fields){
            if(error) 
            res.json(error);
            else
            res.json(results);
        });
  },
  
  tabela : function (){

  },

  routeInclude : function(req, res, next, include){
      global.routeInclude = require(include);
      next();
  }
}