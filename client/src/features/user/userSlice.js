import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordSendOtpAPI, getAllTaskAPI, getProfileAPI, loginUserAPI, resetPasswordAPI, signupUserAPI, verifyOtpAPI } from "./userApi.js";

//  Login Thunk
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await loginUserAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Signup Thunk
export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, thunkAPI) => {
    try {
      return await signupUserAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



//  Get all tasks thunk
export const getAllTasks = createAsyncThunk(
  "user/getAllTasks",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      // const token = state.user.data?.token; // assume backend returns token
      const token = JSON.parse(localStorage.getItem("user")); // token string
      return await getAllTaskAPI(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: "Failed to fetch tasks" });
    }
  }
);

//get-profilr details



export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
     const token = JSON.parse(localStorage.getItem("user")); // token string
     
      return await getProfileAPI(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

//forgotPasswordSendOtp thunk
export const forgotPasswordSendOtp = createAsyncThunk(
  "user/forgotPasswordSendOtp",
  async(userData,thunkAPI)=>{
    // console.log("userdata",userData);
    try {
      return await forgotPasswordSendOtpAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

//verify-otp thunk
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async(userData,thunkAPI)=>{
    try {
      return await verifyOtpAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

//reset-password thunk
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async(userData,thunkAPI)=>{
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      console.log(token);
      console.log(userData);
      return await resetPasswordAPI(token,userData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)




// const userFromStorage = JSON.parse(localStorage.getItem("user"));
// New Code (Fixed)
const storedUser = localStorage.getItem("user");
const userFromStorage = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userFromStorage || null,
    profile:null,
    loading: false,
    error: null,
    todo:null,
    isAuthenticated:false,
    getProfile:false,
    forgotOtpData: null, 
    successMessage: null ,
    verifyOtp:null,
    resetPassword:null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.todo = null;
      state.isAuthenticated=false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.todo=null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // state.todo=action.payload;
        // console.log(action.payload?.data?.token);
        localStorage.setItem("user", JSON.stringify(action.payload?.data?.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
        state.todo=null;
      })

      //  Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload?.data?.token));
        state.isAuthenticated=true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed";
      })
       // Get All Tasks
    .addCase(getAllTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllTasks.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.todo = action.payload; // tasks store ho jayenge
    })
    .addCase(getAllTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch tasks";
    })
     .addCase(getUserProfile.pending, (state) => {
       state.loading = true;
       state.error = null;
     })
     .addCase(getUserProfile.fulfilled, (state, action) => {
       state.loading = false;
       state.profile = action.payload;  // profile data store ho gaya
       state.getProfile = true;
     })
     .addCase(getUserProfile.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload?.message || "Failed to fetch profile";
       state.getProfile = false;
     })
          // Forgot Password Send OTP
     .addCase(forgotPasswordSendOtp.pending, (state) => {
       state.loading = true;
       state.error = null;
      //  state.forgotOtpData=null;
     })
     .addCase(forgotPasswordSendOtp.fulfilled, (state, action) => {
       state.loading = false;
       state.forgotOtpData = action.payload; // response store kar le
      //  console.log("state.forgotOtpData",state.forgotOtpData);
       state.successMessage = "OTP sent successfully";
     })
     .addCase(forgotPasswordSendOtp.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload?.message || "Failed to send OTP";
       state.forgotOtpData = null;
     })
     //verifyOtp slice
     .addCase(verifyOtp.pending, (state) => {
       state.loading = true;
       state.error = null;
      //  state.forgotOtpData=null;
     })
     .addCase(verifyOtp.fulfilled, (state, action) => {
   state.loading = false;
    state.verifyOtp = action.payload; // response store kar le
    
    // FIX: Token ko direct 'token' key se nikal rahe hain
   const token = action.payload?.token; // <--- Yahan change kiya gaya hai
    
   if (token) {
       localStorage.setItem("user", JSON.stringify(token));
       state.successMessage = "OTP verify successfuly";
       } else {
    // Agar phir bhi 'token' nahi mila, toh asli issue hai!
       console.error("TOKEN MISSING. Check your API response key.");
         state.error = "Token not received after successful verification.";
     }
    
})
     .addCase(verifyOtp.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload?.message || "Invalid Otp";
     })
      //resetPassword slice
     .addCase(resetPassword.pending, (state) => {
       state.loading = true;
       state.error = null;
     })
     .addCase(resetPassword.fulfilled, (state, action) => {
       state.loading = false;
       state.resetPassword = action.payload; 
       state.successMessage = "Password reset successfuly";
     })
     .addCase(resetPassword.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload?.message || "password reset unsuccessfull.";
     })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
