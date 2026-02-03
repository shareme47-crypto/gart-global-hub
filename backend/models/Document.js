const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipApplication", index: true },
    docType: {
      type: String,
      required: true,
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
    storage: {
      provider: { type: String, default: "cloudinary" },
      publicId: { type: String, trim: true },
      url: { type: String, trim: true },
      checksum: { type: String, trim: true },
      mimeType: { type: String, trim: true },
      size: { type: Number, min: 0 },
    },
    status: {
      type: String,
      enum: ["uploaded", "in_review", "verified", "rejected"],
      default: "uploaded",
      index: true,
    },
    rejectionReason: { type: String, trim: true },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedAt: { type: Date },
    issuedAt: { type: Date },
    expiresAt: { type: Date },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocumentSchema);
