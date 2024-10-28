import mongoose from "mongoose";

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

export const Task = mongoose.model("Task", taskSchema);
