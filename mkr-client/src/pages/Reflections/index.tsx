import React, { useState } from "react";
import Header from "src/components/Header/Header";
import ReflectionBlock from "src/components/ReflectionBlock/ReflectionBlock";

function Reflections() {
  return (
    <div className="flex-1 min-h-screen w-full h-full px-14 py-8 text-white ml-16 bg-slate-600">
      <Header title="Reflections" subtitle="Track your thoughts and insights" />
      <ReflectionBlock />
    </div>
  );
}

export default Reflections;
