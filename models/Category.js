// const { Schema, model, models } = require("mongoose");

import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: {
      type: String,
      maxlength: [50, "La descripción debe tener como máximo 50 caracteres."],
      trim: true,
    },
    image: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Category = models?.Category || model("Category", CategorySchema);
