import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/users", //  Backend base URL
});

//  LOGIN
export const loginUserAPI = async (userData) => {
  const response = await API.post("/login", userData);
  console.log(response);
  return response.data;
};

// SIGNUP (with Image Upload)
export const signupUserAPI = async (userData) => {
  const response = await API.post("/signup", userData, {
    headers: {
      "Content-Type": "multipart/form-data", //Important for image upload
    },
  });
  console.log("Signup Response:", response);
  return response.data;
};

//GET ALL TASKS
export const getAllTaskAPI = async (token) => {
  const response = await API.get("/get-all-tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// GET PROFILE
export const getProfileAPI = async (token) => {
  const response = await API.get("/get-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("Profile Response:", response);
  return response.data;
};


// forgot-password
export const forgotPasswordSendOtpAPI = async(userData)=>{
//  console.log("Sending OTP Request:", userData);
//  console.log("🔍 Sending request to:", API.defaults.baseURL + "/send-otp");
   const response = await API.post("/send-otp",userData);
   
  //  console.log(response);
   return response?.data;
}

//verify-otp
export const verifyOtpAPI=async(userData)=>{
  const response = await API.post("/verify-otp",userData);
  return response?.data;
} 

//reset-password
export const resetPasswordAPI = async(token,userData)=>{
  console.log(token,userData);
 // Correct way:
const response = await API.post(
   "/reset-password",
   userData, // Sends: { newPassword: 'xyz', confirmPassword: 'xyz' }
   {
    headers: {
         Authorization: `Bearer ${token}`,
     },
 }
);
    console.log(response);
    return response.data;
}

