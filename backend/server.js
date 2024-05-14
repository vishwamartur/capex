const express = require("express");
const connectDB = require("./config");
const authMiddleware = require("./utils/authMiddleware");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
