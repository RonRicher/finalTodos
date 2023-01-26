const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "todos_project"
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;


