const express = require("express");
const { check, validationResult } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

// @route    POST api/auth/register
// @desc     Register a user
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.register(req, res);
  }
);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.login(req, res);
  }
);

// @route    GET api/auth/user
// @desc     Get user by token
// @access   Private
router.get("/user", authMiddleware, authController.getUser);

module.exports = router;
