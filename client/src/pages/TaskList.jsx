import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../features/user/userSlice";
import {
  completeTask,
  deleteTask,
  editTask,
} from "../features/todos/todoSlice";
import toast from "react-hot-toast";
import Search from "./Search";

const TaskList = () => {
  const [expandedTask, setExpandedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();
  const { todo, loading, error } = useSelector((state) => state.user);

  const formatDateTime = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date.toLocaleDateString("en-US", options)} - ${time}`;
  };

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const handleDeleteTask = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      toast.success("Task deleted successfully!");
      dispatch(getAllTasks());
    } catch (error) {
      toast.error("Failed to delete task!");
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await dispatch(completeTask(id)).unwrap();
      toast.success("Task Completed successfully!");
      dispatch(getAllTasks());
    } catch (error) {
      toast.error("Failed to complete task!");
    }
  };

  const handleEditTask = (task) => {
    if (!task.isCompleted) {
      setEditingTaskId(task._id);
      setEditingText(task.description);
    } else {
      toast.error("Task is already Completed.");
    }
  };

  const handleSaveEdit = async (taskId) => {
    if (!editingText.trim()) {
      toast.error("Task description cannot be empty!");
      return;
    }
    try {
      await dispatch(editTask({ taskId, taskData: editingText })).unwrap();
      toast.success("Task updated successfully!");
      setEditingTaskId(null);
      setEditingText("");
      dispatch(getAllTasks());
    } catch (error) {
      toast.error("Failed to update task!");
    }
  };

  return (
    <div>
      {/* Search */}
      <Search setFilteredTasks={setFilteredTasks} />

      <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 overflow-x-hidden h-full">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => {
            const isExpanded = expandedTask === index;
            const isEditing = editingTaskId === task._id;
            return (
              <div
                key={task._id}
                className="bg-gray-100 p-3 rounded-lg shadow-sm flex flex-row justify-between items-center h-full gap-2"
              >
                {/* Task Text + Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full h-full">
                  <p className="bg-gray-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2 ">
                    {index + 1}
                  </p>

                  {isEditing ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full mr-2"
                    />
                  ) : (
                    <p
                      onClick={() =>
                        setExpandedTask(isExpanded ? null : index)
                      }
                      className={`font-medium w-full cursor-pointer ${
                        task.isCompleted
                          ? "line-through  text-gray-400"
                          : "text-gray-800"
                      } ${isExpanded ? "" : "truncate w-[90%]"}`}
                      title={!isExpanded ? task.description : ""}
                    >
                      {isExpanded
                        ? task.description
                        : task.description.length > 10
                        ? task.description.slice(0, 10) + "..."
                        : task.description}
                    </p>
                  )}

                  <span className="text-gray-500 text-sm mt-1 sm:mt-0 sm:ml-4 ">
                    {formatDateTime(new Date(task.createdAt))}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end items-center gap-3 p-4 rounded-xl w-1/4 sm:w-full max-w-md mx-auto">
                  {isEditing ? (
                    <>
                      {loading ? (
                        <p className="text-center mt-10">Loading...</p>
                      ) : (
                        <button
                          onClick={() => handleSaveEdit(task._id)}
                          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all cursor-pointer shadow-md w-25"
                        >
                          Save
                        </button>
                      )}
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all cursor-pointer shadow-md w-25"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditTask(task)}
                        className="px-4 py-2 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-all cursor-pointer shadow-md w-25 "
                      >
                        Edit
                      </button>
                      {loading ? (
                        <p className="text-center mt-10">Loading...</p>
                      ) : (
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all cursor-pointer shadow-md w-25 "
                        >
                          Delete
                        </button>
                      )}
                      {task.isCompleted ? (
                        <button
                          disabled
                          className="px-4 py-2 bg-slate-500 cursor-not-allowed text-white font-semibold rounded-lg transition-all w-25 shadow-md"
                        >
                          Task Completed
                        </button>
                      ) : loading ? (
                        <p className="text-center mt-1 text-sm text-gray-500">
                          Loading...
                        </p>
                      ) : (
                        <button
                          onClick={() => handleCompleteTask(task._id)}
                          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all cursor-pointer w-25 shadow-md"
                        >
                          Complete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400 mt-4">Task not found</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
