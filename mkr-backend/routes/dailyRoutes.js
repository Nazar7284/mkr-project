import express from "express";
import {
  createDailyTask,
  getDailyTasks,
  deleteDailyTask,
  updateDailyTaskStatus,
} from "../controllers/dailyController.js";

const router = express.Router();

router.post("/daily", createDailyTask);
router.get("/daily/:userId", getDailyTasks);
router.patch("/daily/:userId", updateDailyTaskStatus);
router.delete("/daily/:userId", deleteDailyTask);

export default router;
