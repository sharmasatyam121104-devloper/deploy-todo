import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTaskApi, completeTaskApi, deleteTaskApi, editTaskApi } from "./todoApi";

// Async Thunk — Add Task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, thunkAPI) => {
    try {
      // const token = state.user.data?.token; // assume backend returns token
      const token = JSON.parse(localStorage.getItem("user"));  // token string
    //   console.log(token);
      return await addTaskApi(token,taskData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: "Failed to fetch tasks" });
    }
    }
);


// Async Thunk — Delete Task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask", // action type
  async (taskId, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")); // JWT token
      return await deleteTaskApi(token, taskId); // call API
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to delete task" }
      );
    }
  }
);

// Async Thunk — Complte Task
export const completeTask = createAsyncThunk(
  "tasks/completeTask", // action type
  async (taskId, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")); // JWT token
      return await completeTaskApi(token, taskId); // call API
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to complete  task" }
      );
    }
  }
);

// Async Thunk for Editing Task
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ taskId, taskData }, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")); // JWT token
      const response = await editTaskApi(token, taskId, taskData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to edit task" }
      );
    }
  }
);



const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.tasks = action.payload;
        } else {
          state.tasks.push(action.payload);
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add task";
      });
  },
});

export const { logout } = taskSlice.actions;
export default taskSlice.reducer;
