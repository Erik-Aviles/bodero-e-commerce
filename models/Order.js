import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: { type: String, required: true },
    email: String,
    phone: { type: String, required: true },
    city: { type: String, required: true },
    streetAddress: String,
    country: String,
    paid: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
