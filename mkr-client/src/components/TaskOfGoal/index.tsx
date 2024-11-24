import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getTasks } from "src/api/tasks";
import { IGoal, ITask } from "src/models/tasks";

interface ITaskOfGoalProps {
  goal: IGoal;
}

const TaskOfGoal: React.FC<ITaskOfGoalProps> = ({ goal }) => {
  const queryClient = useQueryClient();

  // Отримуємо кешовані дані завдань
  const cachedTasks = queryClient.getQueryData<ITask[]>(["tasks"]);

  const {
    data: tasks,
    error: errorTask,
    isLoading: isLoadingTask,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    enabled: !cachedTasks,
  });

  let goalTasks: ITask[] = [];
  // if (cachedTasks) {
  //   goalTasks = cachedTasks.filter((task) => goal.tasks.includes(task._id));
  // } else if (tasks) {
  //   goalTasks = tasks.filter((task) => goal.tasks.includes(task._id));
  // }

  if (isLoadingTask) {
    return <div>Loading tasks...</div>;
  }

  if (errorTask) {
    return <div>Error loading tasks: {errorTask.message}</div>;
  }

  return (
    <div>
      <h1>Tasks for Goal: {goal.title}</h1>
      {goalTasks.length > 0 ? (
        <ul>
          {goalTasks.map((task) => (
            <li key={task._id}>
              {task.title} - {task.isCompleted ? "Completed" : "In Progress"}
            </li>
          ))}
        </ul>
      ) : (
        <div>No tasks for this goal.</div>
      )}
    </div>
  );
};

export default TaskOfGoal;
