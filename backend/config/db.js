const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("📌 MONGO_URI:", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:");
    console.error(err);
  }
};

module.exports = connectDB;