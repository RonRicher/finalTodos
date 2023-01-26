

var express = require('express');
var router = express.Router();
var con = require('../connection');




/* GET todos listing. */
router.get('/showPosts/:userId', function (req, res, next) {
    const { userId } = req.params;
    con.query(`SELECT * FROM post Where user_id = ${userId} AND deleted=0`, function (err, result, fields) {
        if (err) throw err;
        console.log(result[0]);
        let data = [];
        result.forEach(post => {
            data.push({ id: post.post_id, title: post.description });
        });
        res.send(data);
    });
});


// router.put('/changeTodo', function (req, res, next) {
//     const { todoId, isDone } = req.body;
//     con.connect(function (err) {
//         if (err) throw err;
//         con.query(`UPDATE todo SET finished = ${isDone} WHERE todo_id = ${todoId};`,
//             function (err, result, fields) {
//                 if (err) throw err;
//                 console.log(result[0]);
//             });
//     });
// });

router.post('/addPost', function (req, res, next) {
    const { userId, description } = req.body;
    console.log("Connected!");
    var sql = `INSERT INTO post (user_id, description, deleted) VALUES (${userId}, ${JSON.stringify(description)}, 0)`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.send('');
    });

});


router.delete('/deletePost', function (req, res, next) {
    const { postId } = req.body;
    if (err) throw err;
    var sql = `DELETE FROM post WHERE post_id = ${postId}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        var sql = `DELETE FROM comment WHERE post_id = ${postId}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
        });
        console.log("Number of records deleted: " + result.affectedRows);
    });
});


module.exports = router;