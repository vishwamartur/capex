const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    // Fetch user from database
    const user = await User.findById(req.user.id);

    // Check if user exists and if they are an admin
    if (!user || user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
