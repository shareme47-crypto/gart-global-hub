const express = require("express");
const {
  applyMembership,
  quoteMembership,
  verifyPaymentAndApprove,
  listApplications,
  getApplication,
  rejectApplication,
  getMyLatestApplication,
  getMyCurrentMembership,
} = require("../controllers/membershipController");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

router.post(
  "/apply",
  requireAuth,
  upload.fields([
    { name: "studentPhoto", maxCount: 1 },
    { name: "studentId", maxCount: 1 },
    { name: "professionalPhoto", maxCount: 1 },
    { name: "registrationCertificate", maxCount: 1 },
    { name: "renewalCertificate", maxCount: 1 },
    { name: "volunteerPhoto", maxCount: 1 },
    { name: "nationalId", maxCount: 1 },
  ]),
  applyMembership
);
router.post("/quote", requireAuth, quoteMembership);
router.post("/:applicationId/approve", requireAuth, requireAdmin, verifyPaymentAndApprove);
router.get("/me/latest", requireAuth, getMyLatestApplication);
router.get("/me/current", requireAuth, getMyCurrentMembership);
router.get("/", requireAuth, requireAdmin, listApplications);
router.get("/:applicationId", requireAuth, requireAdmin, getApplication);
router.post("/:applicationId/reject", requireAuth, requireAdmin, rejectApplication);

module.exports = router;
