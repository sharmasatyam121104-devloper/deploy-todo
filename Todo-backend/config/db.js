import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  try {
    const mongoURI = `${process.env.MONGO_DB_URI}/todo-backend`;

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully!".blue.bold);
  } catch (error) {
    console.log(`DB Connection Failed: ${error.message}`.red.bold);
  }
};

export default connectDB;
