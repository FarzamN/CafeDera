import Item from "../model/item.model.js";

// GET all items
export const getItems = async (_, res) => {
  try {
    const data = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch items", error });
  }
};

// ADD a new item
export const addItem = async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price || price <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid item data" });
  }

  try {
    const newItem = new Item({ name, price });
    await newItem.save();
    res.status(201).json({
      status: "success",
      message: "Item added successfully",
      data: newItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to add item", error });
  }
};

// EDIT an existing item
export const editItem = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price || price <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid item data" });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );

    if (!updatedItem) {
      return res
        .status(404)
        .json({ status: "error", message: "Item not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Item updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to update item", error });
  }
};

// DELETE an item
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res
        .status(404)
        .json({ status: "error", message: "Item not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Item deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete item", error });
  }
};
