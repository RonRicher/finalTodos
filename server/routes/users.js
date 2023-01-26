var express = require('express');
var router = express.Router();
var con = require('../connection');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', function (req, res, next) {
  let userExists = false;
  con.query("SELECT username, password, user_id FROM user_access", function (err, result, fields) {
    console.log("Entered quiry");
    if (err) throw err;
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      console.log("Entered for loop", result[i]["username"], req.body.username);
      if (result[i]["username"] === req.body.username && result[i]["password"] === req.body.password) {
        console.log("This user exists!");
        userExists = true;
        let response = JSON.stringify({ userExists: userExists, user_id: result[i]["user_id"] });
        console.log(response);
        res.send(response);
        return;
      }
    }
    console.log('user does not exist');
    res.send(userExists);
  });
});

router.post('/registration', function (req, res, next) {
  console.log("somthing");
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
      res.send(false);
    }
  });
});





module.exports = router;
