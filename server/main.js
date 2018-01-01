var express = require('express');
var app = express();
var mongodb = require('./mongodb_connect');
var bodyParser = require('body-parser');

mongodb.connect().then(function (data) {
    console.log(data);
}).catch(console.error)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.post('/CheckUser', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    mongodb.checkUser(username, password).then(function (data) {
        res.send(data);
    }).catch(function (data) {
        res.send(data);
    })
})

app.post('/RegisterUser', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    mongodb.insertUser(username, password , email).then(function (data) {
        res.send(data);
    }).catch(function (data) {
        res.send(data);
    })
})

var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})