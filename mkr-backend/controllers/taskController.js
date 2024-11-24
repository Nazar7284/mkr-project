import { Task } from "../models/tasks.js";
import { Goal } from "../models/goal.js";

export const createTask = async (req, res) => {
  try {
    const goalId = req.params?.goalId;
    const { title, description, user, priority, deadline, category } = req.body;

    let goal = null;

    if (goalId) {
      goal = await Goal.findById(goalId);
      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }
    }

    const task = new Task({
      title,
      description,
      priority,
      deadline,
      category,
      user,
      goal: goal ? goalId : null,
    });

    await task.save();

    if (goal) {
      goal.tasks.push(task._id);
      await goal.save();
    }

    res.status(201).json({ task, goal });
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

export const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { isCompleted } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { isCompleted },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.goal) {
      const goal = await Goal.findById(task.goal);
      if (goal) {
        goal.tasks.pull(taskId);
        await goal.save();
      }
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: error.message });
  }
};
