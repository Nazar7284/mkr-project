import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import dailyRoutes from "./dailyRoutes.js";
import goalRoutes from "./goalRoutes.js";
import listRoutes from "./listRoutes.js";

const router = express.Router();

router.use(userRoutes);
router.use(taskRoutes);
router.use(dailyRoutes);
router.use(goalRoutes);
router.use(listRoutes);

export default router;
