const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'servidor.ahcom.com.br',
  port     : 3306,
  user     : 'ahcom',
  password : 'vagalumes3204',
  database : 'lotto'
});

module.exports = connection;
