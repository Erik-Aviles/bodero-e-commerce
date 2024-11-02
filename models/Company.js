import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema(
  {
    name: { type: String, trim: true },
    subtitle: {
      type: String,
      trim: true,
    },
    motto: { type: String, trim: true },
    address: {
      type: String,
      trim: true,
    },
    mainPhone: {
      type: String,
    },
    secondaryPhone: {
      type: String,
      trim: true,
    },
    mainEmail: {
      type: String,
    },
    secondaryEmail: {
      type: String,
      trim: true,
    },
    mainlogo: {
      type: String,
    },
    secondarylogo: {
      type: String,
    },
    website: { type: String },
    socialMedia: [{ type: Object }],
    banners: [{ type: Object }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Company = models?.Company || model("Company", CompanySchema);
