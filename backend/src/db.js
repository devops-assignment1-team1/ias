const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'db',
    multipleStatements: true,
});

module.exports = con;