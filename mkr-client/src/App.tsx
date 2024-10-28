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

function App() {
  const modalProps = useModal();

  return (
    <Box display="flex">
      <Sidebar />
      {/* <button onClick={modalProps.onOpen}>Open</button>

      <Modal {...modalProps}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non perferendis
        dolorem dolore, quo omnis quidem fugiat ipsa commodi rem eum?
      </Modal>       */}

      <main className="flex-1 min-h-screen overflow-hidden px-14 py-8 bg-slate-600 text-white ml-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/daily-tasks" element={<DailyTasks />} />
          <Route path="/tasks-and-goals" element={<TasksGoals />} />
          <Route path="/reflections" element={<Reflections />} />
          {/* <Route path="/form" element={<Form />} /> */}
          {/* <Route path="/bar" element={<Bar />} /> */}
          {/* <Route path="/pie" element={<Pie />} /> */}
          {/* <Route path="/line" element={<Line />} /> */}
          {/* <Route path="/faq" element={<FAQ />} /> */}
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          {/* <Route path="/geography" element={<Geography />} /> */}
        </Routes>
      </main>
    </Box>
  );
}

export default App;
