import { Schema, model, models } from "mongoose";
import { OrderSchema } from "./Order";

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: {
      type: String,
    },
    idDocument: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    typeclient: {
      type: String,
      default: "locale",
    },
    myVehicles_list: { type: Object, ref: "Vehicles" },
    myProductOrder_list: { type: Object, ref: "OrdersList" },
    orders: [OrderSchema],
    observations: {
      type: String,
      maxlength: [80, "La observación debe tener como máximo 80 caracteres."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Customer = models?.Customer || model("Customer", CustomerSchema);
