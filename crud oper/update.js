const mysql = require('mysql2');

function updateData(connection, updateData, callback) {
  const updateQuery = 'UPDATE users SET email = ? WHERE user_id = ?';
  connection.query(updateQuery, updateData, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

module.exports = updateData;
