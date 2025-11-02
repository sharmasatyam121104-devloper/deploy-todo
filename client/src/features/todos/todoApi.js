import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/tasks",
});

export const addTaskApi = async (token,taskData ) => {
  const response = await API.post(
    "/add-task",
     {description: taskData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
//   console.log("resp in",response);
  return response.data;
};



// Delete Task API
export const deleteTaskApi = async (token, taskId) => {
  const response = await API.delete(`/delete-task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// completed Task API
export const completeTaskApi = async (token, taskId) => {
  // console.log("token || task", token, taskId);
  const response = await API.put(
    `/complete-task/${taskId}`,  // URL
    {},                          // body agar kuch send nahi karna
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// edit Task API
export const editTaskApi = async (token, taskId ,taskData) => {
  // console.log("token || task", token, taskId);
  const response = await API.put(
    `/edit-task/${taskId}`,  // URL
    {description: taskData },                          // body agar kuch send nahi karna
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

