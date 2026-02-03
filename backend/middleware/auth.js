const { verifyAccessToken } = require("../utils/jwt");

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Missing access token" });
  }

  try {
    const payload = verifyAccessToken(token);
    req.auth = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired access token" });
  }
}

function requireAdmin(req, res, next) {
  const roles = req.auth?.role || req.auth?.roles;
  const roleList = Array.isArray(roles) ? roles : [roles].filter(Boolean);
  if (!roleList.includes("admin")) {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  return next();
}

module.exports = { requireAuth, requireAdmin };
