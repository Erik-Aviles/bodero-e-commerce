import mongoose, { Schema, model, models } from "mongoose";

const DebtsSchema = new Schema(
  {
    customer: { type: String, ref: "Customer" },
    vehicle: { type: String, ref: "Vehicle" },
    payments: [{ type: Object }],
    concept: { type: String},
    date: {
      type: Date, default: Date.now
    },
    document: { type: String},
    fullPaymentDate: { type: Date },
    status: { type: String, default: "pendient" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Debts =
  models?.Debts || model("Debts", DebtsSchema);
