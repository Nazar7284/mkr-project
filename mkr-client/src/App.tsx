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

function App() {
  const modalProps = useModal();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box display="flex">
        <Sidebar />
        {/* <button onClick={modalProps.onOpen}>Open</button>

<Modal {...modalProps}>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Non perferendis
dolorem dolore, quo omnis quidem fugiat ipsa commodi rem eum?
</Modal>       */}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/daily-tasks" element={<DailyTasks />} />
          <Route path="/tasks-and-goals" element={<TasksGoals />} />
          <Route path="/reflections" element={<Reflections />} />
          <Route path="/goalInfo/:goalID" element={<GoalInfo />} />
          {/* <Route path="/form" element={<Form />} /> */}
          {/* <Route path="/bar" element={<Bar />} /> */}
          {/* <Route path="/pie" element={<Pie />} /> */}
          {/* <Route path="/line" element={<Line />} /> */}
          {/* <Route path="/faq" element={<FAQ />} /> */}
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          {/* <Route path="/geography" element={<Geography />} /> */}
        </Routes>
      </Box>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
