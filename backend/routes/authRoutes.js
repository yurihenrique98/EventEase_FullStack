const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

//Task 10: Login
router.post("/login", authController.login);
//Task 11: Logout
router.post("/logout", authController.logout);
//Task 6: Session Check
router.get("/session", authController.getSession);

module.exports = router;