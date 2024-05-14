const express = require("express");
const { check, validationResult } = require("express-validator");
const itemController = require("../controllers/itemController");
const authMiddleware = require("../utils/authMiddleware");
const adminMiddleware = require("../utils/adminMiddleware");

const router = express.Router();

// @route    POST /api/items
// @desc     Create a new item
// @access   Private (Admin only)
router.post(
  "/",
  [
    authMiddleware,
    adminMiddleware,
    [
      check("name", "Name is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    itemController.createItem(req, res);
  }
);

// @route    GET /api/items
// @desc     Get all items
// @access   Public
router.get("/", itemController.getItems);

// @route    GET /api/items/:id
// @desc     Get item by ID
// @access   Public
router.get("/:id", itemController.getItemById);

// @route    PUT /api/items/:id
// @desc     Update item
// @access   Private (Admin only)
router.put(
  "/:id",
  [
    authMiddleware,
    adminMiddleware,
    [
      check("name", "Name is required").optional().not().isEmpty(),
      check("location", "Location is required").optional().not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    itemController.updateItem(req, res);
  }
);

// @route    DELETE /api/items/:id
// @desc     Delete item
// @access   Private (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  itemController.deleteItem
);

module.exports = router;
