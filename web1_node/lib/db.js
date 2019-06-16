// Can version control
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');
var db = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
});

db.connect();
module.exports = db;