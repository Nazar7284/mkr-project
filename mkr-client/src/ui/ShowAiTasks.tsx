import { FC } from "react";
import { ModalProps } from "../hooks/useModal";
import Modal from "./Modal";
import * as Yup from "yup";
import DynamicForm, {
  FieldConfig,
} from "src/components/DynamicForm/DynamicForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGoal } from "src/api/goals";
import { IconButton, Typography } from "@mui/material";
import { FaClipboard } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu"; // Importing the clipboard icon

interface CreateTaskModalProps extends ModalProps {
  tasksAi: string[];
  refresh: () => void;
}

const ShowAiTasks: FC<CreateTaskModalProps> = ({
  tasksAi,
  refresh,
  ...props
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Modal {...props}>
      <div className="p-4">
        <div className="flex justify-between mb-4 border-b-2 border-slate-700">
          <h2 className="text-lg font-semibold">AI Result Tasks</h2>
          <IconButton onClick={refresh}>
            <LuRefreshCcw size={26} />
          </IconButton>
        </div>
        <div>
          {tasksAi.map((title, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-2"
            >
              <Typography variant="body1">{title}</Typography>
              <IconButton onClick={() => handleCopy(title)}>
                <FaClipboard />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ShowAiTasks;
