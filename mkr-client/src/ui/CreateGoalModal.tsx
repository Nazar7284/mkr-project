import { FC } from "react";
import { ModalProps } from "../hooks/useModal";
import Modal from "./Modal";
import * as Yup from "yup";
import DynamicForm, {
  FieldConfig,
} from "src/components/DynamicForm/DynamicForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGoal } from "src/api/goals";

interface CreateTaskModalProps extends ModalProps {}

const CreateGoalModal: FC<CreateTaskModalProps> = ({ ...props }) => {
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
  ];

  const queryClient = useQueryClient();

  const completeTask = useMutation({
    mutationFn: addGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goal"], exact: true });
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
    completeTask.mutate(formData);
    // console.log("Received form data:", formData);
  };

  return (
    <Modal {...props}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Додавання цілі</h2>
        <div>
          <DynamicForm fields={fields} onSubmit={handleSubmitForm} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateGoalModal;
