const express = require("express");
const { check, validationResult } = require("express-validator");
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

// @route    POST /api/reservations
// @desc     Create a new reservation
// @access   Private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("itemId", "Item ID is required").not().isEmpty(),
      check("startDate", "Start date is required").not().isEmpty(),
      check("endDate", "End date is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    reservationController.createReservation(req, res);
  }
);

// @route    GET /api/reservations
// @desc     Get all reservations
// @access   Private
router.get("/", authMiddleware, reservationController.getReservations);

// @route    GET /api/reservations/:id
// @desc     Get reservation by ID
// @access   Private
router.get("/:id", authMiddleware, reservationController.getReservationById);

// @route    DELETE /api/reservations/:id
// @desc     Delete reservation
// @access   Private
router.delete("/:id", authMiddleware, reservationController.deleteReservation);

module.exports = router;
