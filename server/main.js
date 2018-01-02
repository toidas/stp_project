var fs = require('fs');

/**
* @constructor : method to create log folder
``@param : path : where to create folder
*/
function createLogFolder(path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
    }
}
require('./config/index.js');
// Create info folder
createLogFolder(serverConfig.LOGPATH + "info/");
// Create debug folder
createLogFolder(serverConfig.LOGPATH + "debug/");
// Create error folder
createLogFolder(serverConfig.LOGPATH + "error/");

var log = require('./logger/logger.js');
// Initialize the corresponding database type
var database = require('./controller/mongodb_connect');
// Connect mongoDB
database.connectDatabase().then(function (response) {
    log.info("Connected to " + serverConfig.DBTYPE + " database");
    var server = require("./controller/server.js");
}).catch(function (err) {
    log.error("Error");
    log.error(err.stack);
});

// Solve when app is closing
process.on('exit', function exitServer(code) {
    log.info(`About to exit with code: ${code}`);
    database.closeDB();
});

// Catches ctrl+c event
process.on('SIGINT', function sigint() {
    log.info(`close server with ctrl+c `);
    process.exit();
});

// Catches uncaught exceptions
process.on('uncaughtException', function (err) {
    log.error(err.stack);
    database.closeDB();
    process.exit();
})
