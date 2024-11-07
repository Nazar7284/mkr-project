import mongoose from "mongoose";
import { Goal } from "./goal.js";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    deadline: { type: Date },
    isCompleted: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ["work", "personal", "health", "other"],
      default: "other",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goal: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
  },
  { timestamps: true }
);

taskSchema.post("save", async function () {
  if (this.goal) {
    const goal = await Goal.findById(this.goal);
    if (goal) {
      await goal.calculateProgress();
    }
  }
});

taskSchema.post("remove", async function () {
  if (this.goal) {
    const goal = await Goal.findById(this.goal);
    if (goal) {
      await goal.calculateProgress();
    }
  }
});

export const Task = mongoose.model("Task", taskSchema);
