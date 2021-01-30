const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kosong',
  database: 'school_db'
});

connection.connect((err) => {
  if (!err) {
    console.log('Connected!');
  } else {
    console.log('Connection Failed!', err);
  }
});

module.exports = connection;