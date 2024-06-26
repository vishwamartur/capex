const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach user to request object
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const authMiddleware = (req, res, next) => {
  // Middleware implementation
};

module.exports = authMiddleware;
