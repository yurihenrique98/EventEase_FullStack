const db = require('../database/index.js');

module.exports = {
  getAllEvents() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM events', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getEventsByLocation(location) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM events WHERE location = ?', [location], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getTicketsByEvent(eventID) {
    return new Promise((resolve, reject) => {
      db.all('SELECT ticketType, availability , price FROM tickets WHERE eventID = ?', [eventID], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getEventDate(eventID) {
    return new Promise((resolve, reject) => {
      db.get('SELECT date FROM events WHERE id = ?', [eventID], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  getTicketAvailability(eventID, ticketType) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT availability FROM tickets
        WHERE eventID = ?
          AND TRIM(LOWER(ticketType)) = TRIM(LOWER(?))
      `;

      console.log("🟡 Running availability query for eventID:", eventID, "ticketType:", ticketType);

      db.get(query, [eventID, ticketType], (err, row) => {
        if (err) {
          console.log("DB Error:", err);
          reject(err);
        } else {
          console.log("Query result:", row);
          resolve(row);
        }
      });
    });
  },

  updateTicketAvailability(eventID, ticketType, quantity) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE tickets SET availability = availability - ? WHERE eventID = ? AND ticketType = ?',
        [quantity, eventID, ticketType],
        function (err) {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  }
};