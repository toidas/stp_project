var express = require('express');
var app = null;

function singleton() {
    if (app == null) {
        app = express();
    }
    return app;
}

module.exports = singleton();