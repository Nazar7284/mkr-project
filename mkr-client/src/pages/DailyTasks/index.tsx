import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DynamicForm from "src/components/DynamicForm/DynamicForm";
import Header from "src/components/Header/Header";
import TaskList from "src/components/TaskCard";
import dailyTasks from "src/data/mockData";
import useModal from "src/hooks/useModal";
import Modal from "src/ui/Modal";
import axios from "axios";
import CreateTaskModal from "src/ui/CreateTaskModal";

const DailyTasks = () => {
  const modalProps = useModal();
  const [data, setData] = useState<any>();

  const handleCompleteTask = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/mkr/daily/${id}`,
        {
          isCompleted: true,
        }
      );
      console.log("Task updated:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    testgetTask();
  }, []);

  const id = "671c18e1e02d19d05bc98803";

  const testTask = async () => {
    try {
      const response = await axios.post("http://localhost:8000/mkr/tasks", {
        title: "New Task2",
        description: "Description of the new task2",
        user: id,
      });
      console.log("Task created:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const testgetTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/mkr/daily/${id}`);
      setData(response.data);
      console.log("Task get:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Box>
      <div className="flex flex-row items-center flex-wrap border-b-2 border-gray-800">
        <Header title="Daily Task" subtitle="List of all your task for today" />
        <CreateTaskModal {...modalProps} />
        <div className="flex flex-wrap gap-4 justify-around flex-1">
          <button
            onClick={modalProps.onOpen}
            className="bg-gradient-dark-blue text-white font-bold w-72 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            Task
          </button>
          {/* <button
            onClick={modalProps.onOpen}
            className="bg-gradient-dark-blue text-white font-bold w-72 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            Create new daily task
          </button>
          <button
            onClick={modalProps.onOpen}
            className="bg-gradient-dark-blue text-white font-bold w-72 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            Show only uncomplete
          </button>
          <button
            onClick={modalProps.onOpen}
            className="bg-gradient-dark-blue text-white font-bold w-72 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            Show my char
          </button> */}
        </div>
      </div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Мої завдання</h1>
        {data?.map((elem: any) => {
          return (
            <div key={elem._id} className="w-full flex justify-between mt-2">
              <h4>{elem.title}</h4>
              {elem.isCompleted ? (
                <div>Завершено</div>
              ) : (
                <button onClick={() => handleCompleteTask(elem._id)}>
                  Завершити
                </button>
              )}
            </div>
          );
        })}
        {/* <TaskList tasks={dailyTasks} onComplete={handleComplete} /> */}
      </div>
      {/* <Box>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box> */}
    </Box>
  );
};

export default DailyTasks;
