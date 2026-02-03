const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const ACCESS_TTL = process.env.JWT_ACCESS_TTL || "15d";

function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  ACCESS_TTL,
};
