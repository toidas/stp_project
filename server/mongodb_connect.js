var mongoose = require('mongoose');
// Constructor
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    vip: String
});

var UserModel = mongoose.model('User', UserSchema);

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

    connect() {
        return new Promise(function (fulfill, reject) {
            var userDB = "stp_project";
            var passDB = "stp_project";
            var mongoDBURL = 'mongodb://' + userDB + ':' + passDB + '@ds133017.mlab.com:33017/stp_project';
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
                if (user.length > 0) {
                    fulfill("true");
                } else {
                    fulfill("false");
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
}

var mongodb = null;

function singleton() {
    if (mongodb == null) {
        mongodb = new MongoDB();
    }
    return mongodb;
}

module.exports = singleton();



