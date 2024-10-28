const mongoose = require("mongoose");

const dailyTaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const DailyTask = mongoose.model("DailyTask", dailyTaskSchema);
