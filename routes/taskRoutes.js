import express from "express";
import { authJWT } from "../middleware/authJWT.js";
import { createTask } from "../controllers/task.controller.js";

const router = express.Router();

// Create task
router.post("/", authJWT, createTask);

// Get tasks
router.get("/", authJWT);

// Update task
router.put("/:id", authJWT);

// Delete task
router.delete("/:id", authJWT);

export default router;
