import mongoose from "mongoose";

const dailyTaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    statusUpdatedAt: { type: Date },
  },
  { timestamps: true }
);

export const DailyTask = mongoose.model("DailyTask", dailyTaskSchema);
