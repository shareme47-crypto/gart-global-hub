const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true, default: "IN" },
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ["male", "female", "other", "unspecified"], default: "unspecified" },
    nationality: { type: String, trim: true },
    address: AddressSchema,
    emergencyContact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      relation: { type: String, trim: true },
    },
    preferences: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
