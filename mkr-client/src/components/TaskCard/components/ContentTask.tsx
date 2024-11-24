import { Box, Typography } from "@mui/material";
import React from "react";

interface IContentTask {
  title: string;
  description: string;
  status: boolean;
}

function ContentTask({ title, description, status }: IContentTask) {
  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        className="text-2xl font-extrabold text-white"
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        color=""
        className="mt-2 text-gray-300 text-base"
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
