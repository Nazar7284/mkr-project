import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

// Типи для пропсів
interface ITaskInfoProps {
  type: "daily" | "task and goal" | "reflections" | "lists"; // 4 типи
}

const taskInfoTexts = {
  daily: {
    title: "Daily Tasks Info",
    description: (
      <>
        Daily tasks are recurring tasks designed to help you stay consistent
        with your goals. At midnight (00:00), all daily tasks automatically
        reset their status to <strong>not completed</strong>, allowing you to
        start fresh every day.
      </>
    ),
  },
  "task and goal": {
    title: "Task and Goal Info",
    description: (
      <>
        Tasks and goals allow you to plan and track your progress. You can
        create tasks, set priorities, and manage them separately. Each task is
        independent, helping you stay organized and focused on completing them,
        while working towards your long-term objectives.
      </>
    ),
  },
  reflections: {
    title: "Reflections",
    description: (
      <>
        In this section, you can create quick notes with a title and text. These
        notes are fully customizable: you can drag and resize them to suit your
        needs. All reflections are stored locally, ensuring they remain private
        and accessible whenever you need them.
      </>
    ),
  },
  lists: {
    title: "Lists",
    description: (
      <>
        In this section, you can create separate lists and add items to them.
        Each item in the list can have a status that you can change (e.g.,
        completed or pending). This helps you stay organized and track your
        progress as you complete your tasks.
      </>
    ),
  },
};

const TaskInfo: React.FC<ITaskInfoProps> = ({ type }) => {
  const { title, description } = taskInfoTexts[type];

  return (
    <Card
      sx={{
        maxWidth: 400,
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskInfo;
