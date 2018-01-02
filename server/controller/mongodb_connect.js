var mongoose = require('mongoose');
var UserModel = require('../model/User');

class MongoDB {
    constructor() {
        var mongodbConnect;
    }

    setDB(dbConnection) {
        //Get the default connection
        this.mongodbConnect = dbConnection;
        //Bind connection to error event (to get notification of connection errors)
        this.mongodbConnect.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }

    connectDatabase() {
        return new Promise(function (fulfill, reject) {
            
            var mongoDBURL = 'mongodb://' + serverConfig.db.DBUSER + ':' + serverConfig.db.DBPASSWORD + serverConfig.db.HOST+':'+serverConfig.db.PORT+'/'+serverConfig.db.DBNAME;
            // var mongoDBURL = 'mongodb://' + "localhost" + ':' + "27017/demo";
            mongoose.connect(mongoDBURL, {
            });
            // Get Mongoose to use the global promise library
            mongoose.Promise = global.Promise;
            require('./mongodb_connect').setDB(mongoose.connection);
            fulfill("mongodb connected");
        });
    }

    checkUser(username, password) {
        return new Promise(function (fulfill, reject) {
            var query = UserModel.find({ 'username': username, 'password': password });
            query.exec(function (err, user) {
                if (err) {
                    reject(err);
                    return;
                }
                var result = {};
                if (user.length > 0) {
                    result['result'] = true;
                    result['id'] = user[0]._id.toString();
                    fulfill(result);
                } else {
                    result['result'] = false;
                    fulfill(result);
                }
            })
        })
    }

    insertUser(username, password, email) {
        return new Promise(function (fulfill, reject) {
            var user = new UserModel({ 'username': username, 'password': password, 'email': email, 'vip': "0" });

            user.save(function (err, fluffy) {
                if (err) {
                    reject(err);
                    return;
                }
                fulfill("success");
            });
        })
    }

    closeDB() {
        if (this.mongodbConnect != null) {
            this.mongodbConnect.close();
        }
    }
}

var mongodb = null;

function singleton() {
    if (mongodb == null) {
        mongodb = new MongoDB();
    }
    return mongodb;
}

module.exports = singleton();



