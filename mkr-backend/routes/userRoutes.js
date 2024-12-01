import express from "express";
import { createUser, loginUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/registration", createUser);
router.post("/login", loginUsers);

export default router;
