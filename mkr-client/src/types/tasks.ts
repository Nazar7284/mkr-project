export interface Task {
  id: string; // Унікальний ідентифікатор завдання
  title: string; // Назва завдання
  category: "Personal" | "Professional" | "Social" | "Educational"; // Категорія завдання
  deadline: string; // Дата дедлайну (ISO формат: "2024-10-28")
  priority: "Low" | "Medium" | "High"; // Пріоритетність завдання
  status: "Incomplete" | "Complete"; // Статус виконання завдання
}

export interface Subtask {
  id: string; // Унікальний ідентифікатор підзадачі
  title: string; // Назва підзадачі
  status: "Incomplete" | "In Progress" | "Complete"; // Статус підзадачі
}

export interface Goal {
  id: string; // Унікальний ідентифікатор цілі
  title: string; // Назва цілі
  category: "Personal" | "Professional" | "Social" | "Educational" | "None"; // Категорія цілі (None для цілей без категорії)
  completionPercentage: number; // Відсоток виконання (0-100)
  subtasks: Subtask[]; // Масив підзадач для цілі
}

export interface Filter {
  category?: "Personal" | "Professional" | "Social" | "Educational" | "All"; // Фільтрація за категорією
  type?: "Task" | "Goal" | "All"; // Фільтрація за типом (Завдання, Ціль, або Усі)
  status?: "Incomplete" | "Complete" | "In Progress" | "All"; // Фільтрація за статусом
  priority?: "Low" | "Medium" | "High" | "All"; // Фільтрація за пріоритетом
}

export interface UserData {
  //   dailyTasks: dailyTasks[];
  tasks: Task[]; // Масив завдань
  goals: Goal[]; // Масив цілей
  filters: Filter; // Фільтри для відображення завдань і цілей
}
