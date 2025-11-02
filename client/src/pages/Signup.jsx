import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, signupUser } from "../features/user/userSlice";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const { user, loading, error } = useSelector((state) => state.user);
  //its for showing image previwe
  const [preview, setPreview] = useState(null); 

  //its for tackin all value from form
  const [formData, setFormData]= useState({
   email:"",
   username:"",
   password:"",
   phone:"",
   profilePicture:null
  });
   

  //its function for track all value wich changes when usern enter values
  const handleChange = (e)=>{
     const {name,value} = e.target;
     setFormData((prev)=>({
      ...prev,
      [name]:value,
     }))
  }

  //handlechanges for img
  const handleImageChange = (e) => {
    
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: e.target.files[0],
      }));
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  //its for tacking submit value of form 
  const handleSubmit = (e)=>{
    e.preventDefault();
    
    const { email, username, password, phone } = formData;
    if (!email || !username || !password || !phone) {
      return toast.error("All fields are required except profile image.", { position: "top-right", autoClose: 3000 });
    }
     dispatch(signupUser(formData));
     console.log("Form Data:", formData);
  }

   useEffect(() => {
      if (error) {
        toast.error(error, { position: "top-right", autoClose: 3000 });
      }
  
      if (user) {
        toast.success(`Welcome ${user?.data?.username}!`, { position: "top-right", autoClose: 3000 });
        navigate('/')
      }
    }, [error, user]);


  return (
    <div className="flex items-center justify-center min-h-screen px-2 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        
        {/* Logo + Welcome Text */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to To-Do App</h1>
          <p className="text-gray-500 text-sm">Manage your tasks efficiently</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

        <form
        onSubmit={handleSubmit} 
        className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              name="username"
              onChange={handleChange}
              value={formData.username}
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
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              name="phone"
              onChange={handleChange}
              value={formData.phone}

              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1 ">
              Upload Profile Image
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
              name="profilePicture"
             
              className="w-full  h-10 border text-center  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {preview && <img src={preview} alt="Preview" className="mt-2 h-20 w-20 rounded-full object-cover" />}
          </div>

          {/* Register Button */}
          <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            {loading ? "Signup..." : "Signup"}
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm">
            <NavLink to="/login" className="text-blue-600 hover:underline">
              Already have an account?
            </NavLink>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {user && <p className="text-green-500 mt-2">Welcome {user?.data?.username}!</p>}
        </form>
         <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Register;
