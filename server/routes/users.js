var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const con = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'z10mz10m',
    database: 'todos_project'

  }
)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  let userExists = false;
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT username, password FROM user_access", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        if (result[i]["username"] === req.body.username && result[i]["password"] === req.body.password)
          console.log("This user exists!")
        userExists = true;
        res.send(userExists)
        userExists = false;
      }
    })
  })
  console.log('user does not exist');
  res.send(userExists);
});

router.post('/registration', function (req, res, next) {
  con.connect(function (err) {
    if (err) throw err;
    con.query(`SELECT email FROM user_info WHERE email = ${JSON.stringify(req.body.email)}`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      if (result.length === 0) {
        var sql = `INSERT INTO user_info (first_name, last_name, email, phone) VALUES ('${req.body.first_name}','${req.body.last_name}','${req.body.email}','${req.body.phone}') `;
        console.log(sql);
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
        var sql = `INSERT INTO user_access (username, password) VALUES ('${req.body.username}','${req.body.password}')`;
        console.log(sql);
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
        res.send(true);
      } else {
        res.send(false)
      }
    })
  });
});





module.exports = router;
