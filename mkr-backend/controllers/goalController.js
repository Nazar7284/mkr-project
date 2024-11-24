import { Goal } from "../models/goal.js";
import { Task } from "../models/tasks.js";

export const createGoal = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    const goal = new Goal({
      title,
      description,
      user,
      tasks: [],
    });

    await goal.save();
    res.status(201).json(goal);
    console.log("Завершено");
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getGoalWithTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const goal = await Goal.find({ user: userId }).populate("tasks");

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error("Error fetching goal with tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    console.log("goal", req.params);
    const goalId = req.params.goalId;

    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    await Task.deleteMany({ goal: goalId });

    await Goal.findByIdAndDelete(goalId);

    res
      .status(200)
      .json({ message: "Goal and associated tasks deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ error: error.message });
  }
};
