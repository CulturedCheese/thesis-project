var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  database: 'ghdb2'
});

// dbConnection.connect();

module.exports = dbConnection;
