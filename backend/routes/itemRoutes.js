const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authMiddleware = require("../utils/authMiddleware");

// Routes for items
router.post("/", authMiddleware, itemController.createItem);
router.get("/", itemController.getItems);
router.get("/:id", itemController.getItemById);
router.put("/:id", authMiddleware, itemController.updateItem);
router.delete("/:id", authMiddleware, itemController.deleteItem);

module.exports = router;
