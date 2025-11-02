import express from "express";
import { getAllTasks, getProfile, login, resetPassword, sendOTP, signup, verifyOtp } from "../../controllers/users/user.controllers.js";
import isAuthentication from "../../middlewares/isAuthentication.js";
import { upload } from "../../middlewares/upload.js";

const usersRouters = express.Router()

//!Signup Route
usersRouters.post('/signup',upload.single("profilePicture"),signup);

//!login route
usersRouters.post('/login',login);

//!get-profile Route
usersRouters.get('/get-profile',isAuthentication,getProfile);

//!see all task
usersRouters.get('/get-all-tasks',isAuthentication,getAllTasks);

//!send-otp
usersRouters.post('/send-otp',sendOTP);

//!verify-otp
usersRouters.post('/verify-otp',verifyOtp);

//!reset-otp
usersRouters.post('/reset-password',isAuthentication,resetPassword);

export default usersRouters;