const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { connectDatabase } = require("../config/database");
const User = require("../models/User");
const { hashPassword } = require("../utils/password");

async function run() {
  const email = "anurag5713755@gmail.com";
  const password = "12341234";

  await connectDatabase();

  const existing = await User.findOne({ email });
  if (existing) {
    existing.roles = Array.from(new Set([...(existing.roles || []), "admin"]));
    await existing.save();
    console.log("Admin user already existed. Updated roles.");
    process.exit(0);
  }

  const passwordHash = await hashPassword(password);
  await User.create({
    email,
    passwordHash,
    roles: ["admin"],
    isActive: true,
    profile: { firstName: "Anurag", lastName: "Admin" },
  });

  console.log("Admin user created.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Failed to seed admin:", err);
  process.exit(1);
});
