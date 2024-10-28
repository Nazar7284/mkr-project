import { Box } from "@mui/material";
import React from "react";
import DynamicForm from "src/components/DynamicForm/DynamicForm";
import Header from "src/components/Header/Header";
import TaskList from "src/components/TaskCard";
import dailyTasks from "src/data/mockData";
import useModal from "src/hooks/useModal";
import Modal from "src/ui/Modal";
import * as Yup from "yup";
import axios from "axios";

const DailyTasks = () => {
  const fields = [
    {
      name: "title",
      label: "Title",
      initialValue: "",
      validation: Yup.string()
        .required("Title is required")
        .min(2, "Minimum 2 symbols"),
    },
    {
      name: "description",
      label: "Description",
      initialValue: "",
      validation: Yup.string()
        .required("Description is required")
        .min(2, "Minimum 2 symbols"),
    },
  ];

  const modalProps = useModal();

  const handleComplete = (id: number) => {
    console.log(id);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const testUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/mkr/users", {
        login: "login",
        password: "123",
        username: "Nazar7284",
      });
      console.log("User created:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const testTask = async () => {
    try {
      const response = await axios.post("http://localhost:8000/mkr/tasks", {
        title: "New Task",
        description: "Description of the new task",
        user: "671c18e1e02d19d05bc98803",
      });
      console.log("Task created:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const testgetTask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/mkr/get-tasks/671c18e1e02d19d05bc98803`
      );
      console.log("Task get:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Box>
      <div className="flex flex-row items-center flex-wrap border-b-2 border-gray-800">
        <Header title="Daily Task" subtitle="List of all your task for today" />
        <Modal {...modalProps}>
          <div className="w-full">
            <DynamicForm fields={fields} onSubmit={handleFormSubmit} />
          </div>
        </Modal>
        <div className="flex flex-wrap gap-4 justify-around flex-1">
          <button
            onClick={testUser}
            className="bg-gradient-dark-blue text-white font-bold w-72 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            User
          </button>
          <button
            onClick={testTask}
            className="bg-gradient-dark-blue text-white font-bold w-72 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            Task
          </button>
          <button
            onClick={testgetTask}
            className="bg-gradient-dark-blue text-white font-bold w-72 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            get Task
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
        <TaskList tasks={dailyTasks} onComplete={handleComplete} />
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
