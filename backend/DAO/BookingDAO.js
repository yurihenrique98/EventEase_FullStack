const db = require("../database");

module.exports = {
  createBooking(eventID, ticketType, quantity, username) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO bookings (eventID, ticketType, quantity, username) VALUES (?, ?, ?, ?)",
        [eventID, ticketType, quantity, username],
        (err) => (err ? reject(err) : resolve(true))
      );
    });
  },

  getUserBookings(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT b.*, e.name as eventName, e.location, e.date FROM bookings b 
                     JOIN events e ON b.eventID = e.id WHERE b.username = ? ORDER BY b.id DESC`;
      db.all(query, [username], (err, rows) => (err ? reject(err) : resolve(rows)));
    });
  },

  getAllBookings() {
    return new Promise((resolve, reject) => {
      const query = `SELECT b.*, e.name as eventName FROM bookings b 
                     JOIN events e ON b.eventID = e.id ORDER BY b.id DESC`;
      db.all(query, [], (err, rows) => (err ? reject(err) : resolve(rows)));
    });
  },

  deleteBooking(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM bookings WHERE id = ?", [id], (err) => (err ? reject(err) : resolve(true)));
    });
  }
};