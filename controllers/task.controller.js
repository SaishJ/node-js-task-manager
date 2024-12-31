import { customErrorHandler } from "../utils/errorHandler.util.js";
import TaskModel from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title || !description) {
      return customErrorHandler(res, 401, "All fields are required");
    }
    const task = new TaskModel({
      title,
      description,
      completed,
      user: req.user.id,
    });
    await task.save();
    res
      .status(201)
      .json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    console.log("Failed to create task:", error);
  }
};
