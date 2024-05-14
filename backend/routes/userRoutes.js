const express = require("express");
const { check, validationResult } = require("express-validator");
const userController = require("../controllers/userController");
const authMiddleware = require("../utils/authMiddleware");
const adminMiddleware = require("../utils/adminMiddleware");

const router = express.Router();

// @route    GET /api/users
// @desc     Get all users
// @access   Private (Admin only)
router.get("/", authMiddleware, adminMiddleware, userController.getUsers);

// @route    GET /api/users/:id
// @desc     Get user by ID
// @access   Private
router.get("/:id", authMiddleware, userController.getUserById);

// @route    PUT /api/users/:id
// @desc     Update user
// @access   Private
router.put(
  "/:id",
  [
    authMiddleware,
    [
      check("name", "Name is required").optional().not().isEmpty(),
      check("email", "Please include a valid email").optional().isEmail(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    userController.updateUser(req, res);
  }
);

// @route    DELETE /api/users/:id
// @desc     Delete user
// @access   Private (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

module.exports = router;
