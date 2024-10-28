import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import dailyTasks from "src/data/mockData";

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
}

// backend add, complete tasks store day of complete tasks and uncomplete all, if the next day
// ui priorities?

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(task.status);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlusAnimating, setIsPlusAnimating] = useState(false);

  const handleComplete = (id: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsCompleted(true);
      setIsPlusAnimating(true);
    }, 900);
    onComplete(id); // backend
  };

  return (
    <div
      className={`w-full min-h-32 rounded-lg border-4 border-gray-800 flex items-center text-2xl ${
        isCompleted ? "bg-slate-600" : "bg-slate-400"
        // } ${isAnimating && "animate-pulse "
      }
  `}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="div"
            className="text-lg font-bold"
          >
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-1">
            {task.description}
          </Typography>
          <Typography
            variant="body2"
            color={task.status ? "black" : ""}
            className="mt-1"
          >
            Статус: {task.status ? "Завершено" : "Не завершено"}
          </Typography>
        </Box>
        {!isCompleted ? (
          <button
            className={`py-2 px-4 border-2 ${
              isAnimating && "animate-fadeoutright"
            }`}
            onClick={() => handleComplete(task.id)}
          >
            Завершити
          </button>
        ) : (
          <h1 className={`${isPlusAnimating && "animate-fadeinright"}`}>+</h1>
        )}
      </CardContent>
    </div>
    // </Card>
  );
};

const TaskList: React.FC<{
  tasks: Task[];
  onComplete: (id: number) => void;
}> = ({ tasks, onComplete }) => {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onComplete={onComplete} />
      ))}
    </div>
  );
};

export default TaskList;
