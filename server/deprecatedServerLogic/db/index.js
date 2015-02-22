var mysql = require('mysql');

dbConnection = mysql.createConnection({
  user: "root",
  database: "ghdb"
});

dbConnection.connect();

module.exports = dbConnection;

