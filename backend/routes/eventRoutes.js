const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventController");
const requireLogin = require("../middleware/sessionAuth");

// Task 1: GET all events 
router.get('/', eventController.getAllEvents);

// Task 2: GET available tickets for event
router.get("/tickets/:eventID", eventController.getTickets);

// Task 3: Book tickets (must be logged in)
router.post("/book", requireLogin, eventController.bookTicket);

module.exports = router;