const db = require("../database");

module.exports = {
  async findUser(username, password) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }
};