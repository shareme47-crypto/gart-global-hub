const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipApplication", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, uppercase: true, trim: true },
    transactionId: { type: String, required: true, unique: true, trim: true },
    paidAt: { type: Date, required: true },
    payerName: { type: String, trim: true },
    screenshotUrl: { type: String, trim: true },
    qrPayload: { type: String, trim: true },
    status: {
      type: String,
      enum: ["submitted", "verified", "rejected"],
      default: "submitted",
      index: true,
    },
    verifiedAt: { type: Date },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rejectedAt: { type: Date },
    rejectionReason: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
