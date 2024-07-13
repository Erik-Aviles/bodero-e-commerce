import mongoose, { Schema, model, models } from "mongoose";

const ProductShema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    codeEnterprise: {
      type: String,
      trim: true,
      unique: true,
    },
    codeWeb: {
      type: String,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    minPrice: {
      type: Number,
      trim: true,
    },
    tax: { type: Object },
    profitability: {
      type: Number,
      trim: true,
    },
    netPrice: {
      type: Number,
      trim: true,
    },
    salePrice: {
      type: Number,
      trim: true,
    },
    profit: {
      type: Number,
      trim: true,
    },
    offerPrice: {
      type: Number,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: { type: String, ref: "Category" },
    color: [{ type: Object }],
    size: [{ type: Object }],
    quantity: { type: Number, default: 0 }, //este es el stock
    quantityUpdated: { type: Date },
    lastquantity: { type: Number },
    lastquantityUpdated: { type: Date, default: Date.now },
    location: { type: String },
    compatibility: [{ type: Object }],
    description: { type: String, required: true },
    descriptionAdditional: { type: String },
    images: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware para actualizar lastquantityUpdated cuando lastquantity cambie
ProductShema.pre("save", function (next) {
  if (this.isModified("lastquantity")) {
    this.lastquantityUpdated = Date.now();
  }
  next();
});

// Middleware pre-save para operaciones save y updateOne
ProductShema.pre("updateOne", async function (next) {
  const update = this.getUpdate();
  const _id = this.getQuery()._id;

  if (update.$set && update.$set.quantity !== undefined) {
    const product = await mongoose.model("Product").findById(_id);

    if (product && update.$set.quantity < product.quantity) {
      this.set({ quantityUpdated: new Date() });
    }
  }
  next();
});

export const Product = models.Product || model("Product", ProductShema);
