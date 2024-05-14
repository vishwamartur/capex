// /backend/controllers/reservationController.js

const Reservation = require("../models/Reservation");
const Item = require("../models/Item");
const { body, validationResult } = require("express-validator");

// Create a new reservation
const createReservation = async (req, res) => {
  await body("itemId").notEmpty().run(req);
  await body("startDate").isISO8601().toDate().run(req);
  await body("endDate").isISO8601().toDate().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { itemId, startDate, endDate } = req.body;
  const userId = req.user.id;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    const existingReservation = await Reservation.findOne({
      itemId,
      $or: [
        { startDate: { $lt: endDate, $gte: startDate } },
        { endDate: { $gt: startDate, $lte: endDate } },
      ],
    });

    if (existingReservation) {
      return res
        .status(400)
        .json({ msg: "Item is already reserved for the selected dates" });
    }

    const newReservation = new Reservation({
      itemId,
      userId,
      startDate,
      endDate,
    });

    const reservation = await newReservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate(
      "itemId userId",
      "name email"
    );
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate(
      "itemId userId",
      "name email"
    );
    if (!reservation) {
      return res.status(404).json({ msg: "Reservation not found" });
    }
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reservation not found" });
    }
    res.status(500).send("Server error");
  }
};

// Update a reservation
const updateReservation = async (req, res) => {
  await body("startDate").isISO8601().toDate().run(req);
  await body("endDate").isISO8601().toDate().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { startDate, endDate } = req.body;

  try {
    let reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ msg: "Reservation not found" });
    }

    reservation.startDate = startDate;
    reservation.endDate = endDate;

    await reservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reservation not found" });
    }
    res.status(500).send("Server error");
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ msg: "Reservation not found" });
    }

    await reservation.remove();
    res.json({ msg: "Reservation removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reservation not found" });
    }
    res.status(500).send("Server error");
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
