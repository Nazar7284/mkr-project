import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks", createTask);
router.post("/tasks/:goalId", createTask); // to create task for some goal
router.get("/tasks/:userId", getTasks);
router.patch("/tasks/:userId", updateTaskStatus);

export default router;
