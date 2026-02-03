const mongoose = require("mongoose");

const LoginAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    success: { type: Boolean, required: true, index: true },
    reason: { type: String, trim: true },
    ip: { type: String, trim: true },
    userAgent: { type: String, trim: true },
    at: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

LoginAttemptSchema.index({ email: 1, at: -1 });
LoginAttemptSchema.index({ phone: 1, at: -1 });

module.exports = mongoose.model("LoginAttempt", LoginAttemptSchema);
