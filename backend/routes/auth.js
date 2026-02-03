const express = require("express");
const {
  signup,
  login,
  refresh,
  logout,
  me,
  requestSignupOtp,
  verifySignupOtp,
  updateProfile,
  listAdminUsers,
} = require("../controllers/authController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signup/otp/request", requestSignupOtp);
router.post("/signup/otp/verify", verifySignupOtp);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.put("/profile", requireAuth, updateProfile);
router.get("/admins", requireAuth, requireAdmin, listAdminUsers);

module.exports = router;
