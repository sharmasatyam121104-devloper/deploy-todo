import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { forgotPasswordSendOtp, verifyOtp } from "../features/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Toast + state control
  useEffect(() => {
    if (error) {
      toast.error(error);
      setOtpSent(false);
    }

    if (successMessage) {
      toast.success(successMessage);
      if (successMessage.toLowerCase().includes("otp sent")) {
        setOtpSent(true);
      }
    }
  }, [error, successMessage]);

  // Handle button click
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      if (!email) return toast.error("Please enter your email");
      dispatch(forgotPasswordSendOtp({ email }));
    } else {
      if (!email || !otp) return toast.error("Please fill all fields.");
      try {
        await dispatch(verifyOtp({ email, otp })).unwrap();
        toast.success("OTP verified successfully!");
        navigate("/reset-password");
      } catch (err) {
        toast.error(err || "Invalid OTP, try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-2 bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to To-Do App</h1>
          <p className="text-gray-500 text-sm">Manage your tasks efficiently</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <form className="space-y-4" onSubmit={handleSendOtp}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your registered Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* OTP Input (only when sent) */}
          {otpSent && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP sent to your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Button with Loading Spinner */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                {otpSent ? "Verifying..." : "Sending..."}
              </>
            ) : (
              otpSent ? "Verify OTP" : "Send OTP"
            )}
          </button>

          <div className="flex justify-center text-sm">
            <NavLink to="/login" className="text-blue-600 hover:underline">
              Back to Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
