const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true, index: true },
    targetType: { type: String, required: true, index: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, index: true },
    before: { type: mongoose.Schema.Types.Mixed },
    after: { type: mongoose.Schema.Types.Mixed },
    ip: { type: String, trim: true },
    userAgent: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", AuditLogSchema);
