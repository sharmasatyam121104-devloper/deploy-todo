import express from "express";
import isAuthentication from "../../middlewares/isAuthentication.js";
import { addTask, completeTask, deleteTask, editTask } from "../../controllers/todos/todos.controllers.js";


const taskRouters = express.Router()

//!Create or addTodo
taskRouters.post('/add-task',isAuthentication,addTask);

//!edit task route
taskRouters.put('/edit-task/:id',isAuthentication,editTask);

//!delete task route
taskRouters.delete('/delete-task/:id',isAuthentication,deleteTask);

//!complete task route
taskRouters.put('/complete-task/:id',isAuthentication,completeTask);

export default taskRouters;