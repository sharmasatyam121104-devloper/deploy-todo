import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/todos/todoSlice";
import { getAllTasks } from "../features/user/userSlice";
import toast from "react-hot-toast";

const AddTask = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.task);
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    try {
      if (!task.trim()) return alert("Please enter a task!");
      dispatch(addTask(task))
      dispatch(getAllTasks())
      toast.success("Task Add successfully..")
      console.log("Task added:", task);
      setTask(""); // reset input
    } catch (error) {
      console.log(error);
      toast.error("Task add unsuccessful.")
    }
  };

   const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask(); // Enter press -> button click
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mx-auto bg-white p-4 shadow-lg rounded-2xl mb-4">
      {/* Input Box */}
      <input
        type="text"
        placeholder="Enter your task..."
        value={task}
        onChange={(e) => setTask(e.target.value)} // ✅ Correct way
        onKeyDown={handleKeyPress} 
        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      {/* Add Task Button */}
      <button
        onClick={handleAddTask}
        className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
      >
        {loading ? "Adding..." : "Add Task"}
         {error && (
          <p className="text-red-500 text-sm font-medium">
             {error}
          </p>
        )}
      </button>
    </div>
  );
};

export default AddTask;
