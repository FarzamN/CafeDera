import Item from "../model/item.model.js";
import Inventory from "../model/inventory.model.js";


export const getItemWithDate = async (req, res) => {
  const { start, end } = req.body;

  try {
    let filter = {};
    if (start && end) {
      filter.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const data = await Item.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", data });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch items", error });
  }
};

export const getInventoryWithDate = async (req, res) => {
  const { start, end } = req.body;

  try {
    let filter = {};
    if (start && end) {
      filter.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const data = await Inventory.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", data });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch inventory", error });
  }
};
