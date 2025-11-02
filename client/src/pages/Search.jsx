import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Search({ setFilteredTasks }) {
  const { todo } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (todo?.data) {
      const filtered = todo.data.filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks([]); // agar data null ya undefined ho to parent me empty array bhejo
    }
  }, [searchTerm, todo?.data, setFilteredTasks]);

  return (
    <div className="max-w-md mx-auto my-2 p-4 bg-white shadow-lg rounded-xl">
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>
  );
}

export default Search;
