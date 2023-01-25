

var express = require('express');
var router = express.Router();
var con = require('../connection');




/* GET todos listing. */
router.get('/showTodos/:userId', function (req, res, next) {
    const { userId } = req.params;
    console.log('userId: ', userId);
    con.query(`SELECT * FROM todo Where user_id = ${userId} AND deleted=0`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        let data = [];
        result.forEach(todo => {
            data.push({ id: todo.todo_id, title: todo.description, completed: todo.finished });
        });
        console.log(data);
        res.send(JSON.stringify(data));
    });
});

router.put('/changeTodoStatus', function (req, res, next) {
    const { todoId, isDone } = req.body;
    con.query(`UPDATE todo SET finished = ${isDone} WHERE todo_id = ${todoId};`,
        function (err, result, fields) {
            if (err) throw err;
            console.log(result[0]);
        });
});


router.post('/postTodo', function (req, res, next) {
    const { userId, description } = req.body;
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO todo (user_id, description, finished, deleted) VALUES (${userId}, ${JSON.stringify(description)},0, 0)`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});


router.put('/deleteTodo', function (req, res, next) {
    const { todoId } = req.body;
    if (err) throw err;
    var sql = `UPDATE todo SET deleted = 1 WHERE todo_id = ${todoId}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
});


module.exports = router;