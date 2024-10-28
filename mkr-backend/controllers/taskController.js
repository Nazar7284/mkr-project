import { Task } from "../models/tasks.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, user, priority, deadline, category, goal } =
      req.body;

    const task = new Task({
      title,
      description,
      user,
      priority,
      deadline,
      category,
      goal,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.log("get task error");
    res.status(500).json({ error: error.message });
  }
};
