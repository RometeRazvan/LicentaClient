var database = require('mysql');
var dotenv = require('dotenv');

dotenv.config();

var connection = database.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

  module.exports = connection;