import { Schema, model, models } from "mongoose";

export const OrderSchema = new Schema(
  {
    orderNumber: { type: String, unique: true },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    line_items: Object,
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    idDocument: { type: String },
    phone: { type: String },
    country: { type: String },
    province: { type: String },
    city: { type: String },
    streetAddress: String,
    postal: { type: String },
    paid: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
