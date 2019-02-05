const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'servidor.ahcom.com.br',
  port     : 3306,
  user     : 'xxxxxx',
  password : 'xxxxxx',
  database : 'lotto'
});

module.exports = connection;
