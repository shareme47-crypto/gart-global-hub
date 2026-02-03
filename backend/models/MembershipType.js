const mongoose = require("mongoose");

const MembershipTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    tier: { type: Number, required: true, min: 1, max: 4, index: true },
    description: { type: String, trim: true },
    fee: {
      amount: { type: Number, required: true, min: 0 },
      currency: { type: String, required: true, default: "INR", uppercase: true },
    },
    feeConfig: {
      regionFees: {
        india: {
          amount: { type: Number, min: 0 },
          currency: { type: String, uppercase: true, trim: true },
        },
        lmic: {
          amount: { type: Number, min: 0 },
          currency: { type: String, uppercase: true, trim: true },
        },
        international: {
          amount: { type: Number, min: 0 },
          currency: { type: String, uppercase: true, trim: true },
        },
      },
      studentPerYearFees: {
        india: {
          amount: { type: Number, min: 0 },
          currency: { type: String, uppercase: true, trim: true },
        },
        lmic: {
          amount: { type: Number, min: 0 },
          currency: { type: String, uppercase: true, trim: true },
        },
        international: {
          amount: { type: Number, min: 0 },
          currency: { type: String, uppercase: true, trim: true },
        },
      },
    },
    durationMonths: { type: Number, required: true, min: 1 },
    benefits: [{ type: String, trim: true }],
    requiredDocuments: {
      type: [String],
      default: [],
      enum: [
        "AADHAR",
        "PAN",
        "PASSPORT",
        "VOTER_ID",
        "PHOTO",
        "ADDRESS_PROOF",
        "INCOME_PROOF",
        "SIGNATURE",
        "OTHER",
      ],
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipType", MembershipTypeSchema);
