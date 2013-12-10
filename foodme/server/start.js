var path = require('path');
var PORT = process.argv[2] && parseInt(process.argv[2], 10) || 3000;
var STATIC_DIR = __dirname + '/../app';
var DATA_FILE = __dirname + '/data/restaurants.json';
console.log(__dirname); //D:\js_workspace\angular-demos\foodme\server
console.log("static_dir ", path.resolve(STATIC_DIR));// D:\js_workspace\angular-demos\foodme\app
require('./index').start(PORT, STATIC_DIR, DATA_FILE);
