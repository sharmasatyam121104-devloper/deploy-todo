import express from "express";
import "colors";
import dotenv from "dotenv";
import usersRouters from "./routes/userRoutes/user.routes.js";
import connectDB from "./config/db.js";
import { globalErrorHandler, notFoundErrorHandler } from "./middlewares/globalErrorHandler.js";
import taskRouters from "./routes/todoRoutes/todo.routes.js";
import cors from "cors";




//!Create an express app
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,
}));

app.use("/uploads", express.static("uploads"));


//!load th enviornment variables
dotenv.config();

//!conntion of mongo DB
connectDB();

//!setup middleware
app.use(express.json());

//?setup the Router
app.use("/api/v1/users", usersRouters);
app.use("/api/v1/tasks",taskRouters)

//?not found errorhandler
// Handle 404 Not Found
app.use(notFoundErrorHandler);

//?setup the global error handler
app.use(globalErrorHandler);

const PORT = process?.env?.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server is running on: ${`http://localhost:${PORT}`.green.bold}`);
});
