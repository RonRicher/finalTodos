// const mysql = require('mysql')


// // const dataArr = [
// //     ['Daniel', 'John', 'daniel.john@gmail.com', "333-444-4666"],
// //     ['Maebh', 'Harly', 'maebh.harly@gmail.com', "141-123-4343"],
// //     ['Ziv', 'TBD', 'ziv.tbd@gmail.com', "434-576-1234"]
// // ]




// const dataArr = [
//     [1,4, 'This fuck is a post?', 0],
//     [1,5, ' yeah posting time', 0],
//     [2,6, 'Does anyone have a?', 0],
//     [2,4, 'I sure dont have a p', 0],
//     [3,5, 'post post kkkkkkkkkkkkkkk post', 0],
//     [3,6, 'Dude You gotta stop doing thing aaa', 0],
// ]

// const con = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'z10mz10m',
//         database: 'todos_project'

//     }
// )



// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");

//     var sql = "INSERT INTO comment (user_id, post_id, description, deleted) VALUES ?";
//     var values = dataArr;
//     con.query(sql, [values], function (err, result) {
//         if (err) throw err;
//         console.log("Number of records inserted: " + result.affectedRows);
//     });
// });




const fet = fetch('http://localhost:3000/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({username: "DanielJohn", password: "DanielJohn"})
})




