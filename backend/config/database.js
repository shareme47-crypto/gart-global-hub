const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

async function connectDatabase() {
  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined");
  }
  await mongoose.connect(MONGODB_URL);
  console.log("DB Connection Success");
}

module.exports = { connectDatabase };
