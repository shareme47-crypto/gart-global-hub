const MembershipType = require("../models/MembershipType");

async function listMembershipTypes(req, res) {
  const types = await MembershipType.find({}).sort({ tier: 1 });
  return res.json({ success: true, types });
}

async function updateMembershipType(req, res) {
  const code = String(req.params.code || "").toUpperCase().trim();
  if (!code) {
    return res.status(400).json({ success: false, message: "Membership type code is required" });
  }

  const updates = req.body || {};
  const allowed = ["name", "description", "tier", "durationMonths", "fee", "feeConfig", "isActive"];
  const payload = {};

  allowed.forEach((key) => {
    if (updates[key] !== undefined) payload[key] = updates[key];
  });

  const type = await MembershipType.findOneAndUpdate({ code }, payload, { new: true });
  if (!type) {
    return res.status(404).json({ success: false, message: "Membership type not found" });
  }

  return res.json({ success: true, type });
}

module.exports = { listMembershipTypes, updateMembershipType };
