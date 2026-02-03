const express = require("express");
const { listMembershipTypes, updateMembershipType } = require("../controllers/membershipTypeController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, requireAdmin, listMembershipTypes);
router.put("/:code", requireAuth, requireAdmin, updateMembershipType);

module.exports = router;
