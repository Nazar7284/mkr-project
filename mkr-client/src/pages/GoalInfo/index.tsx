import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getResponseAi } from "src/api/ai";
import { deleteTask, getTasks } from "src/api/tasks";
import Header from "src/components/Header/Header";
import TaskList from "src/components/TaskCard";
import useModal from "src/hooks/useModal";
import { ITask } from "src/models/tasks";
import ShowAiTasks from "src/ui/ShowAiTasks";

const GoalInfo = () => {
  const location = useLocation();
  const goal = location.state;

  const [aiTasks, setAiTasks] = useState<string[] | null>(null);

  const queryClient = useQueryClient();

  const {
    data: tasks,
    error: errorTask,
    isLoading: isLoadingTask,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      let cachedTasks = queryClient.getQueryData<ITask[]>(["tasks"]);
      if (!cachedTasks) {
        cachedTasks = await getTasks();
        queryClient.setQueryData(["tasks"], cachedTasks);
      }
      return cachedTasks;
    },
  });

  // для list зробити інформацію про те, скільки виконано і скільки залишилося, можливість вибрати списки
  const handleClickAi = async () => {
    const existingData = localStorage.getItem(goal._id);

    if (existingData) {
      setAiTasks(JSON.parse(existingData));
      modalProps.onOpen();
    } else {
      handleRefreshAi();
    }
  };

  const handleRefreshAi = async () => {
    const response: unknown = await getResponseAi({ goalTitle: goal.title });

    if (typeof response === "string") {
      const responseArray = response.split("#");

      localStorage.setItem(goal._id, JSON.stringify(responseArray));

      setAiTasks(responseArray);
      modalProps.onOpen();
    }
  };

  const modalProps = useModal();

  const taskOfGoal: ITask[] =
    tasks
      ?.filter((task) => task.goal === goal._id)
      .map((task) => ({ ...task, type: "task" })) || [];

  return (
    <div className="flex-1 min-h-screen w-full h-full px-14 py-8 text-white ml-16 bg-slate-600 overflow-hidden">
      <div className="flex gap-5 items-start justify-between flex-wrap border-b-2 border-gray-800 ">
        <Header
          title="Goal info"
          subtitle="Detailed information about a specific goal"
        />
        <button
          onClick={handleClickAi}
          className="bg-gradient-dark-blue text-white font-bold px-2 py-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          Get task from ai
        </button>
      </div>
      <div className="mt-10">
        <TaskList tasks={taskOfGoal} />
      </div>
      {aiTasks && (
        <ShowAiTasks
          tasksAi={aiTasks}
          refresh={handleRefreshAi}
          {...modalProps}
        />
      )}
    </div>
  );
};

export default GoalInfo;
