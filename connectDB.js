const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("DB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;