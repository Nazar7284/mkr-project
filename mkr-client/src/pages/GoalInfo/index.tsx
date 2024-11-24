import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getResponseAi } from "src/api/ai";
import { getTasks } from "src/api/tasks";
import Header from "src/components/Header/Header";
import TaskList from "src/components/TaskCard";
import { ITask } from "src/models/tasks";

const GoalInfo = () => {
  const location = useLocation();
  const goal = location.state;

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

  const [aiResponse, setAiResponse] = useState<any>();

  const handleClickAi = async () => {
    const response: unknown = await getResponseAi({ goalTitle: goal.title });
    if (typeof response === "string") {
      setAiResponse(response.split("#"));
    } else {
      setAiResponse("Smt went wrong");
    }
  };

  const taskOfGoal: ITask[] =
    tasks?.filter((task) => task.goal === goal._id) || [];

  return (
    <div className="flex-1 min-h-screen w-full h-full px-14 py-8 text-white ml-16 bg-slate-600">
      <div className="flex gap-5 items-start flex-wrap border-b-2 border-gray-800">
        <Header
          title="Goal info"
          subtitle="Detailed information about a specific goal"
        />
      </div>
      <div className="mt-10">
        delete
        {isLoadingTask ? (
          <div className="text-4xl font-bold text-center">Loading...</div>
        ) : errorTask ? (
          <div>Помилка {errorTask?.message}</div>
        ) : taskOfGoal.length > 0 ? (
          <TaskList tasks={taskOfGoal} onDelete={() => {}} mode={false} />
        ) : (
          <div className="flex-col">
            <button
              onClick={handleClickAi}
              className="bg-gradient-dark-blue text-white font-bold w-72 h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            >
              Get task from ai
            </button>
            <ul>
              {aiResponse?.map((text: string, index: number) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalInfo;
