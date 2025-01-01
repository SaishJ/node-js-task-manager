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

export const getTasks = async (req, res) => {
  try {
    const task = await TaskModel.find({ user: req.user.id });
    if (task.length === 0) {
      return customErrorHandler(res, 404, "No tasks found");
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    req.error = error;
    console.log("Failed to get tasks:", error);
    return customErrorHandler(res, undefined, undefined, error);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user.id;
    const task = await TaskModel.findOne({ _id, user });
    if (!task) {
      return customErrorHandler(res, 404, "Task not found");
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    req.error = error;
    console.log("Failed to get task:", error);
    return customErrorHandler(res, undefined, undefined, error);
  }
};

export const updateTask = async (req, res) => {
  console.log(req.params);
  try {
    const _id = req.params.id;
    const user = req.user.id;
    const task = await TaskModel.findOneAndUpdate({ _id, user }, req.body, {
      new: true,
    });
    if (!task) {
      return customErrorHandler(res, 404, "Task not found");
    }
    res
      .status(201)
      .json({ success: true, message: "Task updated successfully", task });
  } catch (error) {
    req.error = error;
    console.log("Failed to update task:", error);
    return customErrorHandler(res, undefined, undefined, error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user.id;
    const task = await TaskModel.findOneAndDelete({ _id, user });
    if (!task) {
      return customErrorHandler(res, 404, "Task not found");
    }
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    req.error = error;
    console.log("failed to delete task:", error);
    return customErrorHandler(res, undefined, undefined, error);
  }
};
