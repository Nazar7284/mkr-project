import axios from "axios";

const userId = "671c18e1e02d19d05bc98803";

export async function addDailyTask(formData: any) {
  try {
    const response = await axios.post("http://localhost:8000/mkr/daily", {
      ...formData,
      user: userId,
    });
    console.log("Task daily created:", response.data);
  } catch (error) {
    console.error("Error creating daily task:", error);
  }
}

export async function getDailyTasks() {
  try {
    const response = await axios.get(
      `http://localhost:8000/mkr/daily/${userId}`
    );
    console.log("Daily get:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting task:", error);
  }
}

export async function completeDailyTask(idDaily: string) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/mkr/daily/${idDaily}`,
      {
        isCompleted: true,
      }
    );
    console.log("Task updated:", response.data);
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

export async function deleteDailyTasks(idDaily: string) {
  try {
    console.log("delete");
    const response = await axios.delete(
      `http://localhost:8000/mkr/daily/${idDaily}`
    );
    console.log("Daily delete:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
