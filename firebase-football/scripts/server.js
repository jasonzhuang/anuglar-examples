/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var PORT = process.argv[2] && parseInt(process.argv[2], 10) || 8080;
var STATIC_DIR = __dirname + '/../app';
var DATA_FILE = __dirname + '/data/restaurants.json';

var express = require('express');

function start(PORT, STATIC_DIR, DATA_FILE) {
    var app = express();
    // log requests
    app.use(express.logger('dev'));

    // serve static files for demo client
    app.use(express.static(STATIC_DIR));

    // parse body into req.body
    app.use(express.bodyParser());
    app.listen(PORT, function() {
        console.log("start server...");
    });
}

start(PORT, STATIC_DIR, DATA_FILE);