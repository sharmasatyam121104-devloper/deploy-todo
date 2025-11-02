import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo-backend");
    console.log("MongoDB Connected Successfully!".blue.bold);
  } catch (error) {
    console.log(`DB Connection Failed: ${error.message}`.red.bold);
  }
};

export default connectDB;
