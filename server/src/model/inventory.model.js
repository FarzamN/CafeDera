import { Schema, model } from "mongoose";

const inventorySchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const inventory = model("Inventory", inventorySchema);

export default inventory;
