const mysql = require('mysql2');

function retrieveData(connection, callback) {
  const selectQuery = 'SELECT * FROM users';
  connection.query(selectQuery, (err, rows) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, rows);
  });
}

module.exports = retrieveData;
