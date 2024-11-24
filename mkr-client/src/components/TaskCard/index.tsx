import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { IoMdCheckmark } from "react-icons/io";
import { ImCross } from "react-icons/im";
import ContentTask from "./components/ContentTask";
import useModal from "src/hooks/useModal";
import CreateTaskModal from "src/ui/CreateTaskModal";
import { TiPlus } from "react-icons/ti";
import { FaBullseye, FaFolderOpen, FaList } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDailyTasks } from "src/api/dailyTasks";
import { deleteGoal } from "src/api/goals";
import { deleteTask } from "src/api/tasks";

interface DailyTask {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
  category: "work" | "personal" | "health" | "other";
  deadline: string;
}

type TaskComponentProps = DailyTask | Task;

interface TaskCardProps {
  task: TaskComponentProps;
  mode: boolean;
  onComplete?: (idDaily: string) => void;
  onDelete: (idDaily: string) => void;
}

interface TaskListProps {
  tasks: TaskComponentProps[];
  mode: boolean;
  onComplete?: (id: string) => void;
}

const TaskCard: React.FC<any> = ({
  task,
  mode = false,
  onComplete,
  onDelete,
}) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlusAnimating, setIsPlusAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const modalProps = useModal();
  const queryClient = useQueryClient();

  const handleDeleteDailyTask = useMutation({
    mutationFn: deleteDailyTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyTasks"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  const handleDeleteGoal = useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  const handleDeleteTask = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  const handleDelete = () => {
    if (task.type === "daily") {
      handleDeleteDailyTask.mutate(task._id);
    } else if (task.type === "goal") {
      handleDeleteGoal.mutate(task._id);
    } else if (task.type === "task") {
      handleDeleteTask.mutate(task._id);
    } else {
      console.error("Unknown task type:", task.type);
    }
  };

  const handleComplete = (id: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsCompleted(true);
      setIsPlusAnimating(true);
      onComplete && onComplete(id);
    }, 900);
  };

  return (
    <div
      className={`w-full min-h-32 rounded-lg border-4 border-gray-800 flex items-center text-2xl ${
        isCompleted ? "bg-slate-600" : "bg-slate-400"
      }`}
    >
      {task?.type === "goal" ? (
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CreateTaskModal
            goalId={task._id}
            goalTitle={task.title}
            {...modalProps}
          />
          <ContentTask
            title={task.title}
            description={task.description}
            status={isCompleted}
          />

          <div className="flex gap-4">
            <Tooltip title="Create task for goal" placement="top">
              <div>
                <TiPlus onClick={modalProps.onOpen} />
              </div>
            </Tooltip>
            <Tooltip title="View details" placement="top">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link to={`/goalInfo/${task._id}`} state={task}>
                  {isHovered ? <FaFolderOpen /> : <FaFolderClosed />}
                </Link>
              </div>
            </Tooltip>
            {mode && (
              <div
                onClick={handleDelete}
                className="hover:cursor-pointer hover:text-red-700"
              >
                <ImCross />
              </div>
            )}
          </div>
        </CardContent>
      ) : (
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ContentTask
            title={task.title}
            description={task.description}
            status={isCompleted}
          />

          {mode ? (
            <div
              onClick={handleDelete}
              className="hover:cursor-pointer hover:text-red-700"
            >
              <ImCross />
            </div>
          ) : !isCompleted ? (
            <button
              className={`py-2 px-4 border-2 ${
                isAnimating ? "animate-fadeoutright" : ""
              }`}
              onClick={() => handleComplete(task._id)}
            >
              Complete
            </button>
          ) : (
            <div className={`${isPlusAnimating ? "animate-fadeinright" : ""}`}>
              <IoMdCheckmark />
            </div>
          )}
        </CardContent>
      )}
    </div>
  );
};

const TaskList: React.FC<any> = ({ tasks, ...rest }) => {
  return (
    <div className="flex flex-col gap-4">
      {tasks ? (
        tasks.map((task: any) => (
          <TaskCard key={task._id} task={task} {...rest} />
        ))
      ) : (
        <div className="text-center">No data</div>
      )}
    </div>
  );
};

export default TaskList;
