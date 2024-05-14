const Item = require("../models/Item");

// @desc    Create a new item
// @route   POST /api/items
// @access  Private (Admin only)
const createItem = async (req, res) => {
  const { name, description, location } = req.body;

  try {
    const newItem = new Item({
      name,
      description,
      location,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(500).send("Server error");
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private (Admin only)
const updateItem = async (req, res) => {
  const { name, description, location, availabilityStatus } = req.body;

  const itemFields = {};
  if (name) itemFields.name = name;
  if (description) itemFields.description = description;
  if (location) itemFields.location = location;
  if (availabilityStatus) itemFields.availabilityStatus = availabilityStatus;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(500).send("Server error");
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private (Admin only)
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await item.remove();

    res.json({ msg: "Item removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(500).send("Server error");
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
