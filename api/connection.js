const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'xxxxxxxx',
  port     : 3306,
  user     : 'xxxxxxxx',
  password : 'xxxxxxxxx',
  database : 'xxxxxxxxxxx'
});

module.exports = connection;
