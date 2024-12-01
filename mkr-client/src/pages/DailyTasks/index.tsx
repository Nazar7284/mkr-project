import { Box } from "@mui/material";
import Header from "src/components/Header/Header";
import TaskList from "src/components/TaskCard";
import useModal from "src/hooks/useModal";
import CreateTaskModal from "src/ui/CreateTaskModal";
import { useQuery } from "@tanstack/react-query";
import { getDailyTasks } from "src/api/dailyTasks";
import MyBtn from "src/components/Button";
import { useState } from "react";
import { IDaily } from "src/models/tasks";
import CardInfo from "../Dashboard/components/CardInfo";
import TaskInfo from "../../components/TextInfo";

const DailyTasks = () => {
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

  //bg-gradient-to-r from-slate-900 to-slate-700
  const displayedData = [
    ...(dailyTasks ?? []).map((task: IDaily) => ({ ...task, type: "daily" })),
  ];

  const totalTasks = displayedData.length;

  const completedTasks = displayedData.reduce((count, task) => {
    return task.isCompleted ? count + 1 : count;
  }, 0);

  return (
    <div
      className={`flex-1 min-h-screen w-full h-full px-14 py-8 text-white ml-16 ${
        isDeleteMode
          ? "bg-gradient-to-r from-red-800 to-red-900"
          : "bg-slate-600"
      }`}
    >
      <Box>
        <div className="flex flex-row items-center flex-wrap pb-4 border-b-2 border-gray-800 gap-4">
          <div className="flex items-center justify-around flex-wrap gap-4">
            <Header
              title="Daily Task"
              subtitle="List of all your task for today"
            />
            <CardInfo
              title="Progress Tracker"
              description="Completed / Total Tasks"
              additionalInfo={`${completedTasks} / ${totalTasks}`}
            />
            <TaskInfo type="daily" />
          </div>
          <CreateTaskModal {...modalProps} type="daily" />
          <div className="flex flex-wrap flex-col justify-around gap-4 flex-1">
            <MyBtn
              variant={"gradient"}
              className="self-start"
              onClick={modalProps.onOpen}
            >
              Create Daily Task
            </MyBtn>
            {isDeleteMode ? (
              <MyBtn
                variant={"gradient"}
                className="self-start"
                onClick={toggleDeleteMode}
              >
                Normal mode
              </MyBtn>
            ) : (
              <MyBtn
                variant={"gradient"}
                className="self-start"
                onClick={toggleDeleteMode}
              >
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
