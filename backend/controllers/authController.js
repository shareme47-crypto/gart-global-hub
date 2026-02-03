const crypto = require("crypto");
const User = require("../models/User");
const LoginAttempt = require("../models/LoginAttempt");
const LoginSession = require("../models/LoginSession");
const SignupVerification = require("../models/SignupVerification");
const { sendOtpEmail, sendSignupEmail } = require("../utils/mailer");
const { hashPassword, comparePassword } = require("../utils/password");
const { signAccessToken } = require("../utils/jwt");

const REFRESH_TOKEN_DAYS = Number(process.env.REFRESH_TOKEN_DAYS || 30);
const SET_REFRESH_COOKIE = String(process.env.AUTH_SET_REFRESH_COOKIE || "false") === "true";
const OTP_TTL_MINUTES = Number(process.env.OTP_TTL_MINUTES || 10);
const OTP_DEV_ECHO = String(process.env.OTP_DEV_ECHO || "false") === "true";

function normalizeEmail(email) {
  return String(email || "").toLowerCase().trim();
}

function generateToken(bytes = 48) {
  return crypto.randomBytes(bytes).toString("hex");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function refreshExpiryDate() {
  return new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
}

function setRefreshCookie(res, token, expiresAt) {
  if (!SET_REFRESH_COOKIE) return;
  res.cookie("refreshToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: String(process.env.NODE_ENV || "development") === "production",
    expires: expiresAt,
  });
}

function clearRefreshCookie(res) {
  if (!SET_REFRESH_COOKIE) return;
  res.clearCookie("refreshToken");
}

async function createSession(user, meta) {
  const refreshToken = generateToken();
  const refreshTokenHash = hashToken(refreshToken);
  const sessionId = generateToken(16);
  const expiresAt = refreshExpiryDate();

  const session = await LoginSession.create({
    user: user._id,
    sessionId,
    refreshTokenHash,
    userAgent: meta.userAgent,
    ip: meta.ip,
    device: meta.device,
    status: "active",
    lastActiveAt: new Date(),
    expiresAt,
  });

  return { session, refreshToken, expiresAt };
}

async function signup(req, res) {
  const { email, password, phone, firstName, lastName } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const normalizedEmail = normalizeEmail(email);

  if (String(password).length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
  }

  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }

  const verifiedOtp = await SignupVerification.findOne({
    email: normalizedEmail,
    status: "verified",
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!verifiedOtp) {
    return res.status(400).json({ success: false, message: "Email OTP verification required" });
  }

  const passwordHash = await hashPassword(password);

  let user;
  try {
    user = await User.create({
      email: normalizedEmail,
      phone: phone ? String(phone).trim() : undefined,
      passwordHash,
      profile: {
        firstName: firstName ? String(firstName).trim() : undefined,
        lastName: lastName ? String(lastName).trim() : undefined,
      },
    });
  } catch (err) {
    if (err?.code === 11000) {
      const field = Object.keys(err.keyValue || {})[0] || "field";
      return res.status(409).json({
        success: false,
        message: `${field} already registered`,
      });
    }
    throw err;
  }

  verifiedOtp.status = "consumed";
  await verifiedOtp.save();

  const meta = { userAgent: req.get("user-agent"), ip: req.ip };
  const { session, refreshToken, expiresAt } = await createSession(user, meta);

  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.roles });
  setRefreshCookie(res, refreshToken, expiresAt);

  try {
    await sendSignupEmail({
      to: user.email,
      name: user.profile?.firstName,
    });
  } catch (err) {
    console.warn("Signup email failed:", err?.message || err);
  }


  return res.status(201).json({
    success: true,
    user: { id: user._id, email: user.email, roles: user.roles },
    accessToken,
    refreshToken,
    sessionId: session.sessionId,
  });
}

function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashOtp(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

async function requestSignupOtp(req, res) {
  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const normalizedEmail = normalizeEmail(email);
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }

  const code = generateOtpCode();
  const codeHash = hashOtp(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await SignupVerification.create({
    email: normalizedEmail,
    channel: "email",
    codeHash,
    status: "pending",
    expiresAt,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  try {
    await sendOtpEmail(normalizedEmail, code, OTP_TTL_MINUTES);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to send OTP email" });
  }

  return res.json({
    success: true,
    message: "OTP sent",
    ...(OTP_DEV_ECHO ? { otp: code } : {}),
  });
}

async function verifySignupOtp(req, res) {
  const { email, otpCode } = req.body || {};
  if (!email || !otpCode) {
    return res.status(400).json({ success: false, message: "Email and otpCode are required" });
  }

  const normalizedEmail = normalizeEmail(email);
  const codeHash = hashOtp(String(otpCode).trim());

  const record = await SignupVerification.findOne({
    email: normalizedEmail,
    status: "pending",
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!record) {
    return res.status(400).json({ success: false, message: "OTP expired or not found" });
  }

  record.attempts += 1;

  if (record.codeHash !== codeHash) {
    await record.save();
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  record.status = "verified";
  record.verifiedAt = new Date();
  await record.save();

  return res.json({ success: true, message: "OTP verified" });
}

async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = await User.findOne({ email: String(email).toLowerCase().trim() });

  if (!user) {
    await LoginAttempt.create({
      email: String(email).toLowerCase().trim(),
      success: false,
      reason: "USER_NOT_FOUND",
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const ok = await comparePassword(password, user.passwordHash);

  await LoginAttempt.create({
    user: user._id,
    email: user.email,
    success: ok,
    reason: ok ? undefined : "INVALID_PASSWORD",
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  if (!ok) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  if (!user.isActive) {
    return res.status(403).json({ success: false, message: "Account is disabled" });
  }

  const meta = { userAgent: req.get("user-agent"), ip: req.ip };
  const { session, refreshToken, expiresAt } = await createSession(user, meta);

  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.roles });
  setRefreshCookie(res, refreshToken, expiresAt);

  return res.json({
    success: true,
    user: { id: user._id, email: user.email, roles: user.roles },
    accessToken,
    refreshToken,
    sessionId: session.sessionId,
  });
}

async function refresh(req, res) {
  const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ success: false, message: "Refresh token required" });
  }

  const refreshTokenHash = hashToken(refreshToken);
  const session = await LoginSession.findOne({
    refreshTokenHash,
    status: "active",
    expiresAt: { $gt: new Date() },
  }).populate("user");

  if (!session || !session.user) {
    return res.status(401).json({ success: false, message: "Invalid refresh token" });
  }

  const newRefreshToken = generateToken();
  const newHash = hashToken(newRefreshToken);
  session.refreshTokenHash = newHash;
  session.lastActiveAt = new Date();
  session.expiresAt = refreshExpiryDate();
  await session.save();

  const accessToken = signAccessToken({ sub: session.user._id.toString(), role: session.user.roles });
  setRefreshCookie(res, newRefreshToken, session.expiresAt);

  return res.json({
    success: true,
    accessToken,
    refreshToken: newRefreshToken,
    sessionId: session.sessionId,
  });
}

async function logout(req, res) {
  const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;
  if (!refreshToken) {
    clearRefreshCookie(res);
    return res.json({ success: true });
  }

  const refreshTokenHash = hashToken(refreshToken);
  await LoginSession.findOneAndUpdate(
    { refreshTokenHash, status: "active" },
    { status: "revoked" }
  );

  clearRefreshCookie(res);
  return res.json({ success: true });
}

async function me(req, res) {
  const user = await User.findById(req.auth?.sub).select("email roles profile isActive");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res.json({ success: true, user });
}

async function updateProfile(req, res) {
  const allowedProfileFields = ["firstName", "lastName", "dob", "gender", "nationality"];
  const allowedAddressFields = ["line1", "line2", "city", "state", "postalCode", "country"];

  const updates = {};
  if (req.body?.phone !== undefined) {
    updates.phone = String(req.body.phone).trim();
  }

  if (req.body?.profile) {
    updates.profile = {};
    allowedProfileFields.forEach((field) => {
      if (req.body.profile[field] !== undefined) {
        updates.profile[field] = req.body.profile[field];
      }
    });
  }

  if (req.body?.address) {
    updates.address = {};
    allowedAddressFields.forEach((field) => {
      if (req.body.address[field] !== undefined) {
        updates.address[field] = req.body.address[field];
      }
    });
  }

  const user = await User.findByIdAndUpdate(req.auth?.sub, updates, { new: true })
    .select("email roles profile address phone isActive");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res.json({ success: true, user });
}

async function listAdminUsers(req, res) {
  const admins = await User.find({ roles: "admin" }).select("email roles profile phone isActive");
  return res.json({ success: true, admins });
}

module.exports = {
  signup,
  login,
  refresh,
  logout,
  me,
  updateProfile,
  listAdminUsers,
  requestSignupOtp,
  verifySignupOtp,
};
