const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../utils/authMiddleware");

// Routes for reservations
router.post("/", authMiddleware, reservationController.createReservation);
router.get("/", reservationController.getReservations);
router.get("/:id", reservationController.getReservationById);
router.put("/:id", authMiddleware, reservationController.updateReservation);
router.delete("/:id", authMiddleware, reservationController.deleteReservation);

module.exports = router;
