import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import TaskList from "./TaskList";
import LogOut from "./LogOut";
import AddTask from "./AddTask";
import Search from "./Search";
// import { Toaster } from 'react-hot-toast';

const Home = () => {
  // const dispatch = useDispatch();
  // const { todo, loading, error, user } = useSelector((state) => state.user);

  const [currentTime, setCurrentTime] = useState(new Date());



  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 relative overflow-hidden">
      {/* Real-time clock */}
      <div className="absolute top-2 right-4 bg-gray-800 text-white px-3 py-1 rounded-md shadow-md">
        {currentTime.toLocaleTimeString()}
      </div>

      <div className="w-[90%] md:w-[80%] lg:w-[60%] bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl text-center font-bold text-gray-800 mb-4">
          Welcome To Todo List
        </h1>

             {/* Add Tsk*/}
        <AddTask />

       

        {/* User Info */}
        <UserInfo />

        {/* Tasks List */}
        <TaskList />

        {/* LogOut */}
        <LogOut />
      </div>
      
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
    </div>
  );
};

export default Home;
