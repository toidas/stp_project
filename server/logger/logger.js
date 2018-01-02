var bunyan = require('bunyan');
// Config output format of logger
var bformat = require('bunyan-format'),
    formatOut = bformat({ outputMode: 'short' });
var path = require('path');
// Gets your app's root path
var root = path.dirname(require.main.filename);

if (serverConfig.STDOUT == 1) {
    var streamsTMP = [
        {
            // Use log format for debug level
            stream: formatOut,
            level: serverConfig.logger.level
        }
        ,
        {
            level: 'info',
            type: 'rotating-file',
            path: root + serverConfig.LOGPATH + 'info/info.log',
            period: '1d',   // Daily rotation
            count: 60        // Keep back copies
        },
        {
            level: 'error',
            type: 'rotating-file',
            path: root + serverConfig.LOGPATH + 'error/error.log',
            period: '1d',   // Daily rotation
            count: 60        // Keep back copies
        },
        {
            level: 'debug',
            type: 'rotating-file',
            path: root + serverConfig.LOGPATH + 'debug/debug.log',
            period: '1d',   // Daily rotation
            count: 60       // Keep back copies
        }
    ]
} else {
    var streamsTMP = [
        {
            level: 'info',
            type: 'rotating-file',
            path: root + serverConfig.LOGPATH + 'info/info.log',
            period: '1d',   // Daily rotation
            count: 60        // Keep back copies
        },
        {
            level: 'error',
            type: 'rotating-file',
            path: root + serverConfig.LOGPATH + 'error/error.log',
            period: '1d',   // Daily rotation
            count: 60        // Keep back copies
        },
        {
            level: 'debug',
            type: 'rotating-file',
            path: root + serverConfig.LOGPATH + 'debug/debug.log',
            period: '1d',   // Daily rotation
            count: 60        // Keep back copies
        }
    ]
}

var log = bunyan.createLogger({
    name: 'STP-PROJECT',
    streams: streamsTMP,
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
    }
});

module.exports = log;
