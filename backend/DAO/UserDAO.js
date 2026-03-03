const db = require("../database");

module.exports = {
  findUser(username, password) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  updatePassword(username, newPassword) {
    return new Promise((resolve, reject) => {
      db.run("UPDATE users SET password = ? WHERE username = ?", [newPassword, username], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
};