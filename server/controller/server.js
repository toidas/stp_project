var app = require('./app');
var bodyParser = require('body-parser');
var api = require('./api/api')
var log = require('../logger/logger.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('', api);
var server = app.listen(serverConfig.PORT, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
