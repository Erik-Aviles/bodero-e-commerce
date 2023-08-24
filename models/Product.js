const { Schema, model, models } = require("mongoose");

const ProductShema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [{ type: String }],
    description: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = models.Product || model("Product", ProductShema);
