import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import dailyRoutes from "./dailyRoutes.js";
// import taskRoutes from "./taskRoutes.js";

const router = express.Router();

router.use(userRoutes);
router.use(taskRoutes);
router.use(dailyRoutes);
// router.use(taskRoutes);

export default router;
