import {
  useQuery,
  useQueryClient,
  QueryKey,
  useMutation,
} from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { getGoals } from "src/api/goals";
import { getTasks, handleCompleteTask } from "src/api/tasks";
import MyBtn from "src/components/Button";
import Header from "src/components/Header/Header";
import TaskList from "src/components/TaskCard";
import useModal from "src/hooks/useModal";
import { IGoal, ITask, TaskOrGoal } from "src/models/tasks";
import CreateGoalModal from "src/ui/CreateGoalModal";
import CreateTaskModal from "src/ui/CreateTaskModal";

function TasksGoals() {
  const [selectedOption, setSelectedOption] = useState("tasks");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const toggleDeleteMode = () => setIsDeleteMode(!isDeleteMode);

  const modalProps = useModal();
  const modalProps2 = useModal();

  const queryClient = useQueryClient();

  const completeTask = useMutation({
    mutationFn: handleCompleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyTasks"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  const {
    data: tasks,
    error: errorTask,
    isLoading: isLoadingTask,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    enabled: selectedOption === "tasks" || selectedOption === "all",
  });

  const { data: goals } = useQuery({
    queryKey: ["goals"],
    queryFn: getGoals,
    enabled: selectedOption === "goals" || selectedOption === "all",
  });

  const fetchAll = async (): Promise<TaskOrGoal[]> => {
    let tasks = queryClient.getQueryData<ITask[]>(["tasks"]);
    if (!tasks) {
      tasks = await getTasks();
      queryClient.setQueryData(["tasks"], tasks);
    }

    let goals = queryClient.getQueryData<IGoal[]>(["goals"]);
    if (!goals) {
      goals = await getGoals();
      queryClient.setQueryData(["goals"], goals);
    }

    const allData: any = [
      ...(tasks ?? []).map((task) => ({ ...task, type: "task" })),
      ...(goals ?? []).map((goal) => ({ ...goal, type: "goal" })),
    ];

    return allData;
  };

  const { data: allData } = useQuery({
    queryKey: ["all"],
    queryFn: fetchAll,

    enabled: selectedOption === "all",
  });

  let displayedData;
  if (selectedOption === "tasks") {
    displayedData = tasks?.map((task: ITask) => ({ ...task, type: "task" }));
  } else if (selectedOption === "goals") {
    displayedData = goals?.map((goal: IGoal) => ({ ...goal, type: "goal" }));
  } else if (selectedOption === "all") {
    displayedData = allData;
  }

  return (
    <div className="flex-1 min-h-screen overflow-hidden px-14 py-8 text-white ml-16 bg-slate-600">
      <CreateTaskModal {...modalProps} />
      <CreateGoalModal {...modalProps2} />
      <div className="flex flex-wrap flex-row items-center gap-6 mb-6">
        <Header
          title="Tasks and Goals"
          subtitle="Create, manage, and track your tasks and goals"
        />
        <div className="flex flex-wrap gap-6">
          <select className="min-h-10 min-w-52 border-2 border-gray-800 bg-gradient-dark-blue">
            <option className="bg-slate-600" value="all">
              Усі категорії
            </option>
            <option className="bg-slate-600" value="personal">
              Особисті
            </option>
            <option className="bg-slate-600" value="professional">
              Професійні
            </option>
            <option className="bg-slate-600" value="social">
              Соціальні
            </option>
            <option className="bg-slate-600" value="educational">
              Освітні
            </option>
          </select>
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="min-h-10 min-w-52 border-2 border-gray-800 bg-gradient-dark-blue"
          >
            <option className="bg-slate-600" value="tasks">
              Завдання
            </option>
            <option className="bg-slate-600" value="goals">
              Цілі
            </option>
            <option className="bg-slate-600" value="all">
              Усі
            </option>
          </select>
          <MyBtn variant={"gradient"} onClick={modalProps.onOpen}>
            Create Task
          </MyBtn>
          <MyBtn variant={"gradient"} onClick={modalProps2.onOpen}>
            Create Goal
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
      {isLoadingTask ? (
        <div className="text-4xl font-bold text-center">Loading...</div>
      ) : errorTask ? (
        <div>Помилка {errorTask?.message}</div>
      ) : (
        <TaskList
          tasks={displayedData}
          onComplete={completeTask.mutate}
          mode={isDeleteMode}
        />
      )}
    </div>
  );
}

export default TasksGoals;
