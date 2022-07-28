//import mysql from './node_modules/mysql2';

var mysql = require('mysql2');
var ejs = require('ejs');
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "blogs",
    socketPath: "/tmp/mysql.sock"
});

con.connect(function(err) {
    if (err) throw err;
    let a = con.query("SELECT * FROM blogs", function(err, result, fields) {
        if (err) throw err;
        //console.log(result);
        app.get('/', function(req, res) {
            res.render('blog', { title: result[0].title, content: result[0].content, author: result[0].author });
        });
    });
    console.log("Connected!");
});

app.listen(8080);
console.log('Server is listening on port 8080');