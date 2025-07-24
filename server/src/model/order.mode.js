import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    items: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const order = model("Order", orderSchema);

export default order;
