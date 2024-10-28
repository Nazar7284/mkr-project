const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = { Task, DailyTask, Goal, List, Thought };
