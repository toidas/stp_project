var express = require('express');
var api = express.Router();
var mongodb = require('../mongodb_connect');
var bodyParser = require('body-parser');
var auth = require('../auth_controller.js');

api.get('/', function (req, res) {
    res.send('Hello STP - Project');
})

api.post('/CheckUser', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    log.info("username : "+username +" / password : "+password);
    mongodb.checkUser(username, password).then(function (data) {
        if(data['result']){
            var token = auth.getToken(data['id']);
            delete data['id'];
            data['token'] = token;
        }
        res.send(data);
        log.info(data);
    }).catch(function (data) {
        res.send(data);
        log.error(data);
    })
})

api.post('/RegisterUser', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    mongodb.insertUser(username, password , email).then(function (data) {
        res.send(data);
    }).catch(function (data) {
        res.send(data);
    })
})

module.exports = api;