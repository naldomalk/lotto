module.exports = {
    bd_query : function(SQL, req, res){
        conn.query(SQL, function(error, results, fields){
            if(error) 
            res.json(error);
            else
            res.json(results);
        });
  },
  
  dataTable : function (){

  },

  check_post : function(config, req){
    var fields = config.fields.split(',');
    var a = [];

    fields.forEach(field => {
        field = field.trim();
       
        var props = config.props[field] || {} ;
        var type = props.type || 'text';

        var value = req.query[field];

        if(type=="password") {
            var md5 = require('md5');
            value = md5(value); console.log(value);
        }

        a.push(value);
    });

    // ### implementar checador de funcao dedicada para validacao de campos no post.

    return a;
  }
}