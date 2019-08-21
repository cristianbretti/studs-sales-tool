'user strict';

var mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'studs',
  password: 'studsebest',
  database: 'studs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
