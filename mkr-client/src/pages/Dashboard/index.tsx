import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Header from "src/components/Header/Header";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import CardInfo from "./components/CardInfo";
import { ICardInfo } from "./types";

const Dashboard = () => {
  //   const columns: GridColDef<(typeof rows)[number]>[] = [
  //     { field: "id", headerName: "ID", width: 90 },
  //     {
  //       field: "firstName",
  //       headerName: "First name",
  //       width: 150,
  //       editable: true,
  //     },
  //     {
  //       field: "lastName",
  //       headerName: "Last name",
  //       width: 150,
  //       editable: true,
  //     },
  //     {
  //       field: "age",
  //       headerName: "Age",
  //       type: "number",
  //       width: 110,
  //       editable: true,
  //     },
  //     {
  //       field: "fullName",
  //       headerName: "Full name",
  //       description: "This column has a value getter and is not sortable.",
  //       sortable: false,
  //       width: 160,
  //       valueGetter: (value, row) =>
  //         `${row.firstName || ""} ${row.lastName || ""}`,
  //     },
  //   ];

  //   const rows = [
  //     { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  //     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  //     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  //     { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  //     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  //   ];

  const CardInfoContent: ICardInfo[] = [
    {
      title: "Task Progress",
      description: "Completed this week",
      additionalInfo: "3/7",
    },
    {
      title: "Task Progress",
      description: "Completed this week",
      additionalInfo: "3/7",
    },
    {
      title: "Мотивація дня",
      description:
        "'Єдиний спосіб зробити велику роботу — це любити те, що ви робите.'— Стів Джобс",
      additionalInfo: "Сьогодні: Почни з 5 хвилин роботи над своїми цілями!",
      additionalSize: "body2",
    },
  ];

  return (
    <Box>
      <div className="flex gap-5 items-start flex-wrap border-b-2 border-gray-800">
        <Header
          title="Dashboard"
          subtitle="List of all your task and main information"
        />
        {CardInfoContent.map((content: ICardInfo) => {
          return <CardInfo {...content} />;
        })}
      </div>
      <div className="flex flex-wrap gap-8 w-full h-full justify-center items-center p-4">
        <button className="bg-gradient-dark-blue text-white font-bold w-72 h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          Додати нове завдання
        </button>
        <button className="bg-gradient-dark-blue text-white font-bold w-72 h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          Переглянути щоденні завдання
        </button>
        <button className="bg-gradient-dark-blue text-white font-bold w-72 h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          Зробити швидку нотатку
        </button>
        <button className="bg-gradient-dark-blue text-white font-bold w-72 h-72 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          Бібліотека розвитку
        </button>
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

export default Dashboard;
