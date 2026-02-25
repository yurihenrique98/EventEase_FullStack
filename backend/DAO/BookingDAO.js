const db = require("../database");

module.exports = {
  createBooking(eventID, ticketType, quantity, username) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO bookings (eventID, ticketType, quantity, username) VALUES (?, ?, ?, ?)",
        [eventID, ticketType, quantity, username],
        function (err) {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  }
};