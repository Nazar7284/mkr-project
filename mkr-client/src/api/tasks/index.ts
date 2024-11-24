import axios from "axios";

const userId = "671c18e1e02d19d05bc98803";

export async function addTask(formData: any) {
  try {
    const response = await axios.post("http://localhost:8000/mkr/tasks", {
      ...formData,
      user: userId,
    });
    console.log("Task created:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

export async function handleCompleteTask(idTask: string) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/mkr/tasks/${idTask}`,
      {
        isCompleted: true,
      }
    );
    console.log("Task updated:", response.data);
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

export async function getTasks() {
  try {
    const response = await axios.get(
      `http://localhost:8000/mkr/tasks/${userId}`
    );
    console.log("Daily get:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting task:", error);
  }
}

export async function deleteTask(taskId: string) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/mkr/tasks/${taskId}`
    );
    console.log("Task delete:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting task:", error);
  }
}
