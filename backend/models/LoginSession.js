const mongoose = require("mongoose");

const LoginSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    sessionId: { type: String, required: true, unique: true, index: true },
    refreshTokenHash: { type: String, required: true },
    userAgent: { type: String, trim: true },
    ip: { type: String, trim: true },
    device: {
      name: { type: String, trim: true },
      os: { type: String, trim: true },
      browser: { type: String, trim: true },
    },
    status: { type: String, enum: ["active", "revoked", "expired"], default: "active", index: true },
    lastActiveAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

LoginSessionSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model("LoginSession", LoginSessionSchema);
