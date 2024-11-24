import { Box } from "@mui/material";
import Header from "src/components/Header/Header";
import TaskList from "src/components/TaskCard";
import useModal from "src/hooks/useModal";
import CreateTaskModal from "src/ui/CreateTaskModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDailyTasks,
  getDailyTasks,
  completeDailyTask,
} from "src/api/dailyTasks";
import MyBtn from "src/components/Button";
import { useState } from "react";
import { IDaily } from "src/models/tasks";

const DailyTasks = () => {
  const queryClient = useQueryClient();
  const modalProps = useModal();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const toggleDeleteMode = () => setIsDeleteMode(!isDeleteMode);

  const {
    data: dailyTasks,
    error: errorDaily,
    isLoading: isLoadingDaily,
  } = useQuery({
    queryKey: ["dailyTasks"],
    queryFn: getDailyTasks,
  });

  const completeTask = useMutation({
    mutationFn: completeDailyTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyTasks"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  //bg-gradient-to-r from-slate-900 to-slate-700
  const displayedData = [
    ...(dailyTasks ?? []).map((task: IDaily) => ({ ...task, type: "daily" })),
  ];
  return (
    <div
      className={`flex-1 min-h-screen w-full h-full px-14 py-8 text-white ml-16 ${
        isDeleteMode
          ? "bg-gradient-to-r from-red-800 to-red-900"
          : "bg-slate-600"
      }`}
    >
      <Box>
        <div className="flex flex-row items-center flex-wrap pb-4 border-b-2 border-gray-800">
          <Header
            title="Daily Task"
            subtitle="List of all your task for today"
          />
          <CreateTaskModal {...modalProps} type="daily" />
          <div className="flex flex-wrap gap-4 justify-around flex-1">
            <MyBtn variant={"gradient"} onClick={modalProps.onOpen}>
              Create Daily Task
            </MyBtn>
            {isDeleteMode ? (
              <MyBtn variant={"gradient"} onClick={toggleDeleteMode}>
                Normal mode
              </MyBtn>
            ) : (
              <MyBtn variant={"gradient"} onClick={toggleDeleteMode}>
                Delete Mode
              </MyBtn>
            )}
          </div>
        </div>
        <div className="mt-4">
          {isLoadingDaily ? (
            <div className="text-4xl font-bold text-center">Loading...</div>
          ) : errorDaily ? (
            <div>Помилка {errorDaily?.message}</div>
          ) : (
            <TaskList tasks={displayedData} mode={isDeleteMode} />
          )}
        </div>
      </Box>
    </div>
  );
};

export default DailyTasks;
