import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import taskReducer from "../features/todos/todoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
     task: taskReducer,
  },
});
