import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Goal = mongoose.model("Goal", goalSchema);
