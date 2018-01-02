var config = module.exports = {}

// Port websocket server
config.DBTYPE = "MongoDB";
config.db = {};
// Database IP 
config.db.HOST = "@ds133017.mlab.com";
// Database Port
config.db.PORT = 33017;
config.db.DBNAME = "stp_project";
config.db.DBUSER = "stp_project";
config.db.DBPASSWORD = "stp_project";
// InfluxDB database name
config.db.COLLECTION = "device_data";
config.AUTH_KEY = "supersecret";
// Server Port
config.PORT = 8000;
config.logger = {};
// Logger level 
config.logger.level = 'debug';
// Log to screen ~ 1 , else 0 
config.STDOUT = 1;
// Path of log folder
config.LOGPATH = "/log/";

