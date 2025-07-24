import Inventory from "../model/inventory.model.js";

// GET all inventory
export const getInventory = async (_, res) => {
  try {
    const data = await Inventory.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch inventory",
      error,
    });
  }
};

// ADD inventory item
export const addInventory = async (req, res) => {
  const { name, price, quantity, date } = req.body;

  if (!name || !price || price <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid inventory data" });
  }

  try {
    const newItem = new Inventory({ name, price, quantity, date });
    await newItem.save();
    res.status(201).json({
      status: "success",
      message: "Inventory added successfully",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to add inventory",
      error,
    });
  }
};

// EDIT inventory item
export const editInventory = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, date } = req.body;

  if (!name || !price || price <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid inventory data" });
  }

  try {
    const updated = await Inventory.findByIdAndUpdate(
      id,
      { name, price, quantity, date },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ status: "error", message: "Inventory item not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Inventory updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update inventory",
      error,
    });
  }
};

// DELETE inventory item
export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Inventory.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ status: "error", message: "Inventory item not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Inventory deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete inventory",
      error,
    });
  }
};
