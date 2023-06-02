const mysql = require('mysql2');

function deleteData(connection, id, callback) {
  const deleteQuery = 'DELETE FROM users WHERE user_id = ?';
  connection.query(deleteQuery, id, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

module.exports = deleteData;
