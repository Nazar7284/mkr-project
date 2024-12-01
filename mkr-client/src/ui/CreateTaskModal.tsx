import { FC } from "react";
import { ModalProps } from "../hooks/useModal";
import Modal from "./Modal";
import * as Yup from "yup";
import DynamicForm, {
  FieldConfig,
} from "src/components/DynamicForm/DynamicForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDailyTask } from "src/api/dailyTasks";
import { addTaskToGoal } from "src/api/goals";
import { addTask } from "src/api/tasks";

interface CreateTaskModalProps extends ModalProps {
  type?: "casual" | "daily";
  goalId?: string;
  goalTitle?: string;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({
  type = "casual",
  goalId,
  goalTitle,
  ...props
}) => {
  const fields: FieldConfig[] = [
    {
      name: "title",
      label: "Title",
      initialValue: "",
      validation: Yup.string()
        .required("Title is required")
        .min(2, "Minimum 2 characters"),
    },
    {
      name: "description",
      label: "Description",
      initialValue: "",
      validation: Yup.string()
        .required("Description is required")
        .min(2, "Minimum 2 characters"),
    },
    {
      name: "priority",
      label: "Priority",
      initialValue: "medium",
      validation: Yup.string()
        .oneOf(["low", "medium", "high"])
        .required("Priority is required"),
      type: "select",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
    },
  ];

  const queryClient = useQueryClient();

  const filteredFields = type === "casual" ? fields : fields.slice(0, 2);
  const mutationFn = async (variables: { formData: any; goalId?: string }) => {
    if (type === "casual") {
      if (variables.goalId) {
        return addTaskToGoal({
          formData: variables.formData,
          goalId: variables.goalId,
        });
      } else {
        return addTask(variables.formData);
      }
    } else {
      return addDailyTask(variables.formData);
    }
  };

  const queryKey =
    type === "casual" ? (goalId ? "goal" : "tasks") : "dailyTasks";

  const completeTask = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey], exact: true });
      props.onClose();
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  const handleSubmitForm = async (formData: any) => {
    if (formData.deadline) {
      formData.deadline = new Date(formData.deadline).toISOString();
    }
    completeTask.mutate({ formData, goalId });
  };

  return (
    <Modal {...props}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Add Daily Task</h2>
        <div>
          <DynamicForm fields={filteredFields} onSubmit={handleSubmitForm} />
        </div>
        {goalId && <div>Create task for goal {goalTitle}</div>}
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
