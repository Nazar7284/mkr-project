import cron from "node-cron";
import { DailyTask } from "../models/dailyTask.js";

export const createDailyTask = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    const dailyTask = new DailyTask({
      title,
      description,
      user,
      isCompleted: false,
    });

    await dailyTask.save();

    res.status(201).json(dailyTask);
  } catch (error) {
    console.error("Error creating daily task:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getDailyTasks = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const dailyTasks = await DailyTask.find({ user: userId });
    console.log("1", dailyTasks);

    res.status(200).json(dailyTasks);
  } catch (error) {
    console.error("Error fetching daily tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateDailyTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { isCompleted } = req.body;

    const task = await DailyTask.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Daily task not found" });
    }

    task.isCompleted = isCompleted;
    task.statusUpdatedAt = new Date();
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating daily task status:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteDailyTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await DailyTask.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: "Daily task not found" });
    }

    res.status(200).json({ message: "Daily task deleted successfully" });
  } catch (error) {
    console.error("Error deleting daily task:", error);
    res.status(500).json({ error: error.message });
  }
};

cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();

    const tasks = await DailyTask.find({
      isCompleted: { $ne: true },
      statusUpdatedAt: { $lt: new Date(now.setHours(0, 0, 0, 0)) },
    });

    for (let task of tasks) {
      task.isCompleted = false;
      task.statusUpdatedAt = null;
      await task.save();
    }

    console.log("Daily task statuses have been reset.");
  } catch (error) {
    console.error("Error resetting daily task statuses:", error);
  }
});
