import asyncHandler from "express-async-handler";
import Todo from "../../models/Todo.Models/Todo.models.js";
import User from "../../models/User.Models/User.models.js";

//@desc   Add task
//@route  POST /api/v1/tasks/add-task
//@access Private

export const addTask = asyncHandler(async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({
      status: "Failed",
      message: "Description not given by user",
    });
  }

  // Create new task
  const newTodo = new Todo({
    user: req.userAuth._id, // directly from token
    description,
  });

  await newTodo.save();

  // Push the new task into user's todos array
  await User.findByIdAndUpdate(
    req.userAuth._id,
    { $push: { todos: newTodo._id } }, // push the task's _id
    { new: true }
  );

  res.status(201).json({
    status: "Success",
    message: "Task added successfully",
    data: newTodo,
  });
});



//@desc   Edit task
//@route  POST /api/v1/tasks/edit-task/:id
//@access Private

export const editTask = asyncHandler(async(req,res,next)=>{
    const taskId = req?.params?.id;
    const {description}=req.body;
    const updatedTask = await Todo.findByIdAndUpdate(
    taskId,
    { description },
    { new: true } // updated document return karega
  );
  
  if (!updatedTask) {
    return res.status(404).json({
      status: "Failed",
      message: "Task not found",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Task description updated successfully",
    data: updatedTask,
  });
});


//@desc   Delete task
//@route  POST /api/v1/tasks/delete-task/:id
//@access Private

export const deleteTask = asyncHandler(async(req,res,next)=>{
    const taskId = req?.params?.id;
    const deletedTask = await Todo.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return res.status(404).json({
      status: "Failed",
      message: "Task not found",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Task deleted successfully",
    data: deletedTask, // poora document delete hone ke baad response me bhej sakte ho
  });
});


//@desc   complted task
//@route  POST /api/v1/tasks/complete-task/:id
//@access Private

export const completeTask = asyncHandler(async(req,res,next)=>{
    const taskId = req?.params?.id;
   const completedTask = await Todo.findByIdAndUpdate(
  taskId,
  { isCompleted: true },
  { new: true } // taaki updated document return ho
);


  if (!completeTask) {
    return res.status(404).json({
      status: "Failed",
      message: "Task not found",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Task complete successfully",
    data: completeTask, // poora document delete hone ke baad response me bhej sakte ho
  });
});


