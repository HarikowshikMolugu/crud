const mysql = require('mysql2');

function createData(connection, data, callback) {
  const insertQuery = 'INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?)';
  connection.query(insertQuery, data, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

module.exports = createData;
