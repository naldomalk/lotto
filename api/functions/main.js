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
    let fields = config.fields.split(',');
    let a = [];

    fields.forEach(field => {
        field = field.trim();
       
        let props = config.props[field] || {} ;
        let type = props.type || 'text';

        let value = req.query[field];

        if(type=="password") {
            var md5 = require('md5');
            value = md5(value);
        }

        a.push(value);
    });

    // ### implementar checador de funcao dedicada para validacao de campos no post.

    return a;
  }
}