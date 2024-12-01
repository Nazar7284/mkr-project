import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";

interface IContentTask {
  title: string;
  description: string;
  status: boolean;
  priority?: "low" | "medium" | "high";
}

function ContentTask({ title, description, status, priority }: IContentTask) {
  const getColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "yellow";
      case "high":
        return "red";
      default:
        return "gray";
    }
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography
          variant="h5"
          component="div"
          className="text-2xl font-extrabold text-white"
        >
          {title}
        </Typography>
        {priority && (
          <Tooltip title={`Priority: ${priority}`} placement="top">
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: getColor(priority),
                marginLeft: "8px",
              }}
            ></div>
          </Tooltip>
        )}
      </Box>
      <Typography
        variant="body1"
        color=""
        className="mt-2 text-white text-base"
      >
        {description}
      </Typography>

      <Typography
        variant="body1"
        className={`text-xl font-semibold mt-2 ${
          status ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {status ? "Completed" : "Not completed"}
      </Typography>
    </Box>
  );
}

export default ContentTask;
