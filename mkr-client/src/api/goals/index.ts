import axios from "axios";

const userId = localStorage.getItem("userId");

export async function addGoal(formData: any) {
  try {
    const response = await axios.post("http://localhost:8000/mkr/goal", {
      ...formData,
      user: userId,
    });
    console.log("Goal created:", response.data);
  } catch (error) {
    console.error("Error creating goal:", error);
  }
}

export async function addTaskToGoal({
  formData,
  goalId,
}: {
  formData: any;
  goalId: string;
}): Promise<any> {
  try {
    const response = await axios.post(
      `http://localhost:8000/mkr/tasks/${goalId}`,
      {
        ...formData,
        user: userId,
      },
    );
    console.log("Task created:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

export async function getGoals() {
  try {
    const response = await axios.get(
      `http://localhost:8000/mkr/goals/${userId}`,
    );
    console.log("Goal get:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting goal:", error);
  }
}

export async function deleteGoal(goalId: string) {
  try {
    console.log("goal1", goalId);
    const response = await axios.delete(
      `http://localhost:8000/mkr/goals/${goalId}`,
    );
    console.log("Goal delete:");
    return response.data;
  } catch (error) {
    console.error("Error getting goal:", error);
  }
}
