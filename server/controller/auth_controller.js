var jwt = require('jsonwebtoken');

class AuthController {
    constructor() {
        
    }

    getToken(userID){
        var token = jwt.sign({ id: userID }, serverConfig.AUTH_KEY, {
            expiresIn: 600
        });
        return token;
    }
}

var auth = null;

function singleton() {
    if (auth == null) {
        auth = new AuthController();
    }
    return auth;
}

module.exports = singleton();
