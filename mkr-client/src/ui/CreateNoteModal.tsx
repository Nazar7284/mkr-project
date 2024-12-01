import { FC } from "react";
import { ModalProps } from "../hooks/useModal";
import Modal from "./Modal";
import * as Yup from "yup";
import DynamicForm, {
  FieldConfig,
} from "src/components/DynamicForm/DynamicForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGoal } from "src/api/goals";

interface CreateTaskModalProps extends ModalProps {
  onComplete: (title: string, content: string) => void;
}

const CreateNoteModal: FC<CreateTaskModalProps> = ({
  onComplete,
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
  ];

  const handleSubmitForm = async (formData: any) => {
    const { title, description } = formData;
    onComplete(title, description);
  };

  return (
    <Modal {...props}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Create note</h2>
        <div>
          <DynamicForm fields={fields} onSubmit={handleSubmitForm} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateNoteModal;
