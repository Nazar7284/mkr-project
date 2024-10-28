// CustomButton.tsx
import React from "react";

interface MyBtnProps {
  label: string;
  onClick: () => void;
  className?: string; // Пропс для передання Tailwind класів
}

const MyBtn: React.FC<MyBtnProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700 transition duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default MyBtn;
