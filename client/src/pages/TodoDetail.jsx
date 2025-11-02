import React from 'react';

const TodoDetail = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center px-3">
      <div className="bg-white h-auto w-full sm:w-10/12 md:w-8/12 lg:w-6/12 rounded-2xl shadow-2xl p-6">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome To Todo List</h1>
        <p className="text-center text-gray-600 mb-6">Fullname</p>

        {/* Edit Section */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner mb-5">
          <label htmlFor="editTask" className="block text-gray-700 font-semibold mb-2">
            Edit Your Task Here
          </label>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Task No: 1</h2>
          <p className="text-sm text-gray-500 mb-3">
            Created At:{" "}
            {new Date().toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <textarea
            name="editTask"
            id="editTask"
            placeholder="Edit your task..."
            className="border border-gray-300 rounded-lg w-full min-h-[120px] p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 resize-none"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer px-6 py-2 rounded-2xl text-lg font-semibold text-white shadow-md transition-all duration-200">
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
