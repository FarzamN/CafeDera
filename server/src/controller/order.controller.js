import order from "../model/order.mode.js";

export const getOrder = async (_, res) => {
  try {
    const data = await order.find().sort({ createdAt: -1 }).populate("items");

    res.status(200).json({ status: "success", data });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch items", error });
  }
};

export const addOrder = async (req, res) => {
  const { items, quantity } = req.body;
  const date = new Date();

  if (!items || quantity <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid item data" });
  }

  try {
    const data = new order({ items, quantity, date });
    await data.save();
    res.status(201).json({
      status: "success",
      message: "Order added successfully",
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to add Order", error });
  }
};
