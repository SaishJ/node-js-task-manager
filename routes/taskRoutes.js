import express from "express";
import { authJWT } from "../middleware/authJWT.js";
import {
  createTask,
  deleteTask,
  getTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// Create task
router.post("/", authJWT, createTask);

// Get tasks
router.get("/", authJWT, getTasks);

// Get task by id
router.get("/:id", authJWT, getTaskById);

// Update task
router.put("/:id", authJWT, updateTask);

// Delete task
router.delete("/:id", authJWT, deleteTask);

export default router;
