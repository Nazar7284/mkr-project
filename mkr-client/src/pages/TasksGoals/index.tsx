import React from "react";
import Header from "src/components/Header/Header";

function TasksGoals() {
  return (
    <div>
      <div className="flex flex-wrap flex-row items-center gap-10">
        <Header
          title="Tasks and Goals"
          subtitle="Create, manage, and track your tasks and goals"
        />
        <div></div>
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

        <select className="min-h-10 min-w-52 border-2 border-gray-800 bg-gradient-dark-blue">
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
      </div>
    </div>
  );
}

export default TasksGoals;
