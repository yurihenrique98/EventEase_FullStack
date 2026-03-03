const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventController");
const requireLogin = require("../Middleware/sessionAuth");

router.get('/', eventController.getAllEvents);
router.get("/tickets/:eventID", eventController.getTickets);
router.post("/book", requireLogin, eventController.bookTicket);

router.get("/admin/all-bookings", requireLogin, eventController.adminGetBookings);
router.delete("/admin/booking/:id", requireLogin, eventController.adminDeleteBooking);

module.exports = router;