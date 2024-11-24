// CustomButton.tsx
import React from "react";
import { cn } from "src/utils/cn";

interface MyBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  variant?: "gradient" | "primary";
}

const MyBtn: React.FC<React.PropsWithChildren<MyBtnProps>> = ({
  onClick,
  className,
  type = "button",
  variant = "gradient",
  children,
  ...props
}) => {
  const baseButtonStyles = "py-2 px-4 rounded text-white";
  const variants = {
    gradient:
      "bg-gradient-dark-blue font-bold min-w-72 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300",
    primary:
      "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700 transition duration-300",
    // success: '',
    // danger: '',
  };

  const buttonClass = cn(baseButtonStyles, variants[variant]);

  return (
    <button onClick={onClick} className={cn(buttonClass, className)} {...props}>
      {children}
    </button>
  );
};

export default MyBtn;
