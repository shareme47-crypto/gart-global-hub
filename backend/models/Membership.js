const mongoose = require("mongoose");
const Counter = require("./Counter");

const MembershipSchema = new mongoose.Schema(
  {
    membershipId: { type: String, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    membershipType: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipType", required: true, index: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipApplication" },
    status: {
      type: String,
      enum: ["active", "suspended", "expired", "cancelled"],
      default: "active",
      index: true,
    },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date, required: true },
    issuedAt: { type: Date, default: Date.now },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    renewalCount: { type: Number, default: 0, min: 0 },
    autoRenew: { type: Boolean, default: false },
    lastRenewedAt: { type: Date },
  },
  { timestamps: true }
);

async function nextMembershipId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "membership" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  const seq = String(counter.seq).padStart(6, "0");
  return `GART-${seq}`;
}

MembershipSchema.pre("validate", async function setMembershipId() {
  if (this.membershipId) return;
  this.membershipId = await nextMembershipId();
});

module.exports = mongoose.model("Membership", MembershipSchema);
