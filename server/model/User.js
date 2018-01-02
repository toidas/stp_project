var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    vip: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');