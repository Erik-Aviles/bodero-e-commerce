// const { Schema, model, models } = require("mongoose");

import mongoose, { Schema, model, models } from "mongoose";

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: {
      type: String,
    },

    identifications: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    myVehicles_list: { type: Object, ref: "Vehicles" },
    myProductOrder_list: { type: Object, ref: "OrdersList" },
    myShopping_list: [{ type: Object }],
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
