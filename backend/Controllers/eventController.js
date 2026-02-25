const EventDAO = require("../DAO/EventDAO");
const BookingDAO = require("../DAO/BookingDAO");

function parseYYMMDD(dateStr) {
  const year = 2000 + parseInt(dateStr.slice(0, 2));
  const month = parseInt(dateStr.slice(2, 4)) - 1;
  const day = parseInt(dateStr.slice(4, 6));
  return new Date(year, month, day);
}

module.exports = {
  // Task 1: Get all events (with optional location filtering)
  async getAllEvents(req, res) {
    const { location } = req.query;
    try {
      const events = location
        ? await EventDAO.getEventsByLocation(location)
        : await EventDAO.getAllEvents();
      res.json(events);
    } catch (err) {
      console.error("Error fetching events:", err);
      res.status(500).json({ error: "Could not retrieve events" });
    }
  },

  // Task 2: Get tickets for event
  async getTickets(req, res) {
    try {
      const eventID = req.params.eventID;
      const tickets = await EventDAO.getTicketsByEvent(eventID);
      res.json(tickets);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tickets" });
    }
  },

  // Task 3: Book tickets
  async bookTicket(req, res) {
    const { eventID, ticketType, quantity } = req.body;
    const username = req.session.user?.username;

  if (!eventID || !ticketType || !quantity || !username) {
    return res.status(400).json({ error: "Missing booking fields" });
  }

  try {
    const event = await EventDAO.getEventDate(eventID);

    if (!event || !event.date) {
      return res.status(404).json({ error: "Event not found or missing date" });
    }

    const eventDate = parseYYMMDD(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      return res.status(400).json({ error: "Event already occurred" });
    }

    const availability = await EventDAO.getTicketAvailability(eventID, ticketType);
    console.log("Availability object from DB:", availability);

    if (!availability || availability.availability === undefined) {
      console.log("Error: availability record not found or column missing.");
      return res.status(400).json({ error: "Ticket availability not found" });
    }

    const availableCount = parseInt(availability.availability);
    const requestedCount = parseInt(quantity);

    console.log(`Available: ${availableCount}, Requested: ${requestedCount}`);

    if (isNaN(availableCount) || isNaN(requestedCount) || availableCount < requestedCount) {
      return res.status(400).json({ error: "Not enough tickets available" });
    }

    await EventDAO.updateTicketAvailability(eventID, ticketType, quantity);
    await BookingDAO.createBooking(eventID, ticketType, quantity, username);

    res.json({ success: true, message: "Booking confirmed!" });

  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: "Booking failed" });
  }
  }
  };