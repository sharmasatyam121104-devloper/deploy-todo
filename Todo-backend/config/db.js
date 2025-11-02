import mongoose from "mongoose";
import "colors";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_DB_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(" MongoDB Connected Successfully!".blue.bold);
    console.log(" Connecting to:", mongoURI.green);
  } catch (error) {
    console.log(` DB Connection Failed: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
