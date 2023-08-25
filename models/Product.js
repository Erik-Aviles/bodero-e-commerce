import mongoose, { Schema, model, models } from "mongoose";

const ProductShema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    quantity: { type: Number, required: true },
    images: [{ type: String }],
    properties: { type: Object },
    description: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = models.Product || model("Product", ProductShema);
