import express from "express";
import {
  addItemToList,
  createList,
  deleteItemFromList,
  deleteList,
  getAllLists,
  markItemAsCompleted,
} from "../controllers/listController.js";

const router = express.Router();

router.post("/list/:userId", createList);
router.post("/list/add/:listId", addItemToList);
router.get("/list/:userId", getAllLists);
router.delete("/list/:listId", deleteList);
router.patch("/list/complete", markItemAsCompleted);
router.delete("/list/:listId/:itemId", deleteItemFromList);

export default router;
