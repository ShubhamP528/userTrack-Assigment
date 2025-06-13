require("dotenv").config();
const dbConnect = async () => {
  const mongoose = require("mongoose");
  const dbURI = process.env.MONGO_URI;

  try {
    await mongoose.connect(dbURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
