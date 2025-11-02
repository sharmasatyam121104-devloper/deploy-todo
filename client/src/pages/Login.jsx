import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../features/user/userSlice';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  // Form data
  const [formData, setFormData] = useState({});

  // Handle input change dynamically
  const handleChange = (e) => {
    const { value } = e.target;
    if (value.includes("@") && value.includes(".")) {
      setFormData({ email: value }); // email key
    } else {
      setFormData({ username: value }); // username key
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Show toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right", autoClose: 3000 });
    }
    if (user) {
      toast.success(`Welcome ${user?.data?.username || user?.data?.email}!`, {
        position: "top-right",
        autoClose: 3000
      });
      navigate('/');
    }
  }, [error, user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen p-2 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to To-Do App</h1>
          <p className="text-gray-500 text-sm">Manage your tasks efficiently</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Dynamic Email/Username Input */}
          <div>
            <label htmlFor="userInput" className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <input
              type={formData.email ? "email" : "text"} // dynamic input type
              id="userInput"
              placeholder="Enter your email or username"
              value={formData.email || formData.username || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password || ""}
              name='password'
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm">
            <NavLink to="/signup" className="text-blue-600 hover:underline">
              Don’t have an account?
            </NavLink>
            <NavLink to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </NavLink>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
