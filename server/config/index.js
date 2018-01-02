var env = process.env.NODE_ENV || 'default';
var config = require("./config_" + env);

console.log('Environment : ' + "./config_" + env);

global.serverConfig = config