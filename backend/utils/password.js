const bcrypt = require("bcryptjs");

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);

async function hashPassword(password) {
  return  await bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = { hashPassword, comparePassword };
