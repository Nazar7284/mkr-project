const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Список завдань, пов’язаних з ціллю
    progress: { type: Number, default: 0, min: 0, max: 100 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Посилання на користувача
  },
  { timestamps: true }
);

goalSchema.pre("save", async function (next) {
  const tasks = await mongoose.model("Task").find({ _id: { $in: this.tasks } });
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  this.progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  next();
});

export const Goal = mongoose.model("Goal", goalSchema);
