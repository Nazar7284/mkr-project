import Header from "src/components/Header/Header";
import { ICardInfo } from "./types";

const Dashboard = () => {
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
    <div className="flex-1 min-h-screen w-full h-full px-14 py-8 text-white ml-16 bg-slate-600">
      <div className="flex gap-5 items-start flex-wrap border-b-2 border-gray-800">
        <Header
          title="Dashboard"
          subtitle="List of all your task and main information"
        />
        {/* {CardInfoContent.map((content: ICardInfo) => {
          return <CardInfo {...content} />;
        })} */}
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
    </div>
  );
};

export default Dashboard;
