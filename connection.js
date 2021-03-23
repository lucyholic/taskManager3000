var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  post: 3306,
  user: 'dbadmin',
  password: 'Team10@dmin',
  database: 'db_taskmaster'
});

module.exports = connection;