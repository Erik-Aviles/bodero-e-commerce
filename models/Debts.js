import { Schema, model, models } from "mongoose";

const DebtsSchema = new Schema(
  {
    customer: { type: String, ref: "Customer" },
    vehicle: { type: String },
    concept: { type: String},
    document: { type: String},
    amount: { type: Number},
    debtBalance: { type: Number},
    fullPaymentDate: { type: Date },
    payments: [{ type: Object }],
    status: { type: String, default: "pendient" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Debts =
  models?.Debts || model("Debts", DebtsSchema);
