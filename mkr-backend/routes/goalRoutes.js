import express from "express";
import { createGoal, getGoalWithTasks } from "../controllers/goalController.js";

const router = express.Router();

router.post("/goal", createGoal);
router.get("/goal/:userId", getGoalWithTasks);

export default router;
