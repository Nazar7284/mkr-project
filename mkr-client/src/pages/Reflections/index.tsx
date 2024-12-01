import React, { useState } from "react";
import Header from "src/components/Header/Header";
import ReflectionBlock from "src/components/ReflectionBlock/ReflectionBlock";
import TaskInfo from "src/components/TextInfo";

function Reflections() {
  return (
    <div className="ml-16 h-full min-h-screen w-full flex-1 bg-slate-600 px-14 py-8 text-white">
      <div className="flex flex-row flex-wrap items-center gap-4 border-b-2 border-gray-800">
        <Header
          title="Reflections"
          subtitle="Track your thoughts and insights"
        />
        <TaskInfo type="reflections" />
      </div>
      <div>
        <ReflectionBlock />
      </div>
    </div>
  );
}

export default Reflections;
