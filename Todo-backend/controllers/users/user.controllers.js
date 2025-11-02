import User from "../../models/User.Models/User.models.js";
import bcrypt from "bcryptjs";
import genrateToken from "../../utils/genrateToken.js";
import asyncHandler from "express-async-handler";
import Todo from "../../models/Todo.Models/Todo.models.js";
import { sendOTPEmail } from "../../config/otpMail.js";

//@desc   Register new user
//@route  POST /api/v1/users/signup
//@access Public

//!signup controller here
export const signup = asyncHandler(async (req, res, next) => {
  const { email, username, password, phone, } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(400).json({
      status: "Failed",
      message: "User already exists",
    });
  }

  // Check if image is uploaded
  const profilePicture = req.file ? req.file.path : null;

  //  Create new user
  const newUser = new User({
    username,
    email,
    password,
    phone,
    profilePicture,
  });

  //hash password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await newUser.save();

  // Response
  res.status(201).json({
    status: "Success",
    message: "User signup successfully",
    data: {
      _id: newUser?._id,
      username: newUser?.username,
      email: newUser?.email,
      profilePicture: newUser?.profilePicture,
      token: genrateToken(newUser),
    },
  });
});

//@desc   Login user
//@route  POST /api/v1/users/login
//@access Public

export const login = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check user exists
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(400).json({
      status: "Failed",
      message: "User Not Found",
    });
  }

  // Compare password
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid credentials",
    });
  }

  // Update last login time
  user.lastlogin = new Date();
  await user.save();

  // Send response (password removed)
  res.status(200).json({
    status: "Success",
    message: "User login successfully",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      token: genrateToken(user),
    },
  });
});

//@desc   profile viwe
//@route  GET /api/v1/users/profile
//@access privet

export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.userAuth?._id).select("-password");

  if (!user) {
    return res.status(404).json({
      status: "Failed",
      message: "User not found",
    });
  }

  res.json({
    status: "Success",
    message: "User profile fetched successfully",
    data: user, // bas yahi bhejna hai
  });
});

//@desc   logout
//@route  GET /api/v1/users/logout
//@access privet

// export const logout= asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req?.userAuth?._id).select("-password");

//   if (!user) {
//     return res.status(404).json({
//       status: "Failed",
//       message: "User not found",
//     });
//   }

//   res.json({
//     status: "Success",
//     message: "User profile fetched successfully",
//     data: user, // bas yahi bhejna hai
//   });
// });



// @desc   see all task
// @route  GET /api/v1/users/get-all-tasks
// @access privet

export const getAllTasks = asyncHandler(async (req, res, next) => {
  const user = req.userAuth;
  const userId = user?._id;
  const allTasks = await Todo.find({ user: userId }).select("description createdAt isCompleted");

  res.status(201).json({
    status: "Success",
    message: "Task frtched successfully",
    data: allTasks,
    user,
  });
});




//send otp via mail
//@desc   send otp for forgot password
//@route  POST /api/v1/users/otp-send
//@access Public


// export const sendOTP = asyncHandler(
//   async (req, res) => {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ message: "Email required" });
//     }

//     const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
//     const otp = generateOTP();
//     const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

//     //  ek hi query me find + update
//     const user = await User.findOneAndUpdate(
//       { email }, // find condition
//       { otp, otpExpires }, // update fields
//       { new: true } // updated document return kare
//     );

//     // agar user nahi mila to error
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Email bhejna
//     await sendOTPEmail(email, otp);

//     return res.status(200).json({
//       message: "OTP sent successfully",
//     });
  
// }
// );

export const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
  const otp = generateOTP();
  const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

  const user = await User.findOneAndUpdate(
    { email },
    { otp, otpExpires },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await sendOTPEmail(email, otp);

  return res.status(200).json({
    message: "OTP sent successfully",
  });
});



//verify otp
//@desc   send otp for forgot password
//@route  POST/api/v1/users/verify-otp
//@access Public

export const verifyOtp = asyncHandler(async(req,res)=>{
   const {otp,email} = req.body;
   if (!otp || !email) {
    return res.status(400).json({ message: "Email and Otp both are required" });
   }
   const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    console.log(otp);
    console.log(user?.otp);
    if(otp !== user?.otp){
      return res.status(400).json({ message: "Invalid OTP" });
    }

     if (user.otpExpires && user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return res.status(200).json({ message: "OTP verified successfully",token: genrateToken(user), });
})

//reset password
//@desc   send otp for forgot password
//@route  POST/api/v1/users/reset-password
//@access privet

export const resetPassword= asyncHandler(async(req,res)=>{
  const user = req.userAuth;
const userId = user?._id;
const { password } = req.body;

if (!userId) {
  return res.status(400).json({ message: "Invalid user" });
}

// hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// update user password
const updatedUser = await User.findByIdAndUpdate(
  userId,
  { password: hashedPassword },
  { new: true }
);

return res.status(200).json({ message: "Password reset successfully",  });
});


