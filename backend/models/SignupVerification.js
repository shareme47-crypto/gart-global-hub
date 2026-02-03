const mongoose = require("mongoose");

const SignupVerificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true, index: true },
    channel: { type: String, enum: ["email", "sms"], required: true },
    codeHash: { type: String, required: true },
    status: { type: String, enum: ["pending", "verified", "consumed", "expired"], default: "pending", index: true },
    expiresAt: { type: Date, required: true, index: true },
    verifiedAt: { type: Date },
    attempts: { type: Number, default: 0, min: 0 },
    ip: { type: String, trim: true },
    userAgent: { type: String, trim: true },
  },
  { timestamps: true }
);

SignupVerificationSchema.index({ email: 1, status: 1 });
SignupVerificationSchema.index({ phone: 1, status: 1 });
SignupVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("SignupVerification", SignupVerificationSchema);
