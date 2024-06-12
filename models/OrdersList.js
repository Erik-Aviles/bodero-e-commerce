import moment from "moment-timezone";
import mongoose, { Schema, model, models } from "mongoose";

const OrdersListSchema = new Schema(
  {
    customer: { type: String, ref: "Customer" },
    articulo: { type: String, required: true, trim: true },
    orderEntryDate: {
      type: Date,
    },
    date: {
      type: Date,
    },
    orderDeliveryDate: { type: Date },
    delivered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OrdersList =
  models?.OrdersList || model("OrdersList", OrdersListSchema);
