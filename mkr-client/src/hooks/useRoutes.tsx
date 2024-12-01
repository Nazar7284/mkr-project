import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DailyTasks from "../pages/DailyTasks";
import Reflections from "../pages/Reflections";
import TasksGoals from "../pages/TasksGoals";
import GoalInfo from "../pages/GoalInfo";
import Lists from "../pages/Lists";
import React from "react";
import Auth from "src/pages/Login";

export const useRoutes = () => {
  const isLogin = localStorage.getItem("userId");

  if (isLogin) {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/daily-tasks" element={<DailyTasks />} />
        <Route path="/tasks-and-goals" element={<TasksGoals />} />
        <Route path="/reflections" element={<Reflections />} />
        <Route path="/goalInfo/:goalID" element={<GoalInfo />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
