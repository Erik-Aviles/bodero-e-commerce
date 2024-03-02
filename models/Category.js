// const { Schema, model, models } = require("mongoose");

import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Category = models?.Category || model("Category", CategorySchema);
