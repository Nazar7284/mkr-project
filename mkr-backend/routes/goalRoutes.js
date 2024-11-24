import express from "express";
import {
  createGoal,
  deleteGoal,
  getGoalWithTasks,
} from "../controllers/goalController.js";

const router = express.Router();

router.post("/goal", createGoal);
router.get("/goals/:userId", getGoalWithTasks);
router.delete("/goals/:goalId", deleteGoal);

export default router;
