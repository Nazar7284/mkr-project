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
router.patch("/daily/:dailyId", updateDailyTaskStatus);
router.delete("/daily/:dailyId", deleteDailyTask);

export default router;
