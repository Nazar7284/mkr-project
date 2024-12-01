import { Box, IconButton } from "@mui/material";
import Sidebar from "./scenes/Sidebar";
import Modal from "./ui/Modal";
import { useState } from "react";
import useModal from "./hooks/useModal";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DailyTasks from "./pages/DailyTasks";
import Reflections from "./pages/Reflections";
import TasksGoals from "./pages/TasksGoals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GoalInfo from "./pages/GoalInfo";
import Lists from "./pages/Lists";
import { useRoutes } from "./hooks/useRoutes";

function App() {
  const modalProps = useModal();
  const queryClient = new QueryClient();
  const routes = useRoutes();

  return (
    <QueryClientProvider client={queryClient}>
      <Box display="flex">
        <Sidebar />
        {/* <button onClick={modalProps.onOpen}>Open</button>

<Modal {...modalProps}>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Non perferendis
dolorem dolore, quo omnis quidem fugiat ipsa commodi rem eum?
</Modal>       */}

        {routes}
      </Box>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
