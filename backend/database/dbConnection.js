import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "school_management_system", // ✅ No spaces in DB name
    });

    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};
