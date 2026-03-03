const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/session", authController.getSession);
router.get("/my-bookings", authController.getMyBookings);
router.post("/change-password", authController.changePassword);

module.exports = router;