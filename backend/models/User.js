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

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, sparse: true, trim: true },
    passwordHash: { type: String, required: true },
    roles: {
      type: [String],
      default: ["user"],
      enum: ["user", "admin", "reviewer"],
    },
    isActive: { type: Boolean, default: true },
    profileRef: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    profile: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      dob: { type: Date },
      gender: { type: String, enum: ["male", "female", "other", "unspecified"], default: "unspecified" },
      nationality: { type: String, trim: true },
    },
    address: AddressSchema,
    kycStatus: {
      type: String,
      enum: ["not_started", "pending", "verified", "rejected"],
      default: "not_started",
      index: true,
    },
    currentMembership: { type: mongoose.Schema.Types.ObjectId, ref: "Membership" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
