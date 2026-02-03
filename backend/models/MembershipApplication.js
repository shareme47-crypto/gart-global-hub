const mongoose = require("mongoose");

const StatusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["submitted", "under_review", "needs_changes", "approved", "rejected", "withdrawn"],
    },
    at: { type: Date, default: Date.now },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    note: { type: String, trim: true },
  },
  { _id: false }
);

const MembershipApplicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, unique: true, sparse: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    membershipType: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipType", required: true, index: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    status: {
      type: String,
      enum: ["submitted", "under_review", "needs_changes", "approved", "rejected", "withdrawn"],
      default: "submitted",
      index: true,
    },
    formData: { type: mongoose.Schema.Types.Mixed, required: true },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    decidedAt: { type: Date },
    decision: {
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      reason: { type: String, trim: true },
      notes: { type: String, trim: true },
    },
    history: { type: [StatusHistorySchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipApplication", MembershipApplicationSchema);
