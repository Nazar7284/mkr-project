import { FC } from "react";
import { ModalProps } from "../hooks/useModal";
import Modal from "./Modal";
import * as Yup from "yup";
import DynamicForm, {
  FieldConfig,
} from "src/components/DynamicForm/DynamicForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGoal } from "src/api/goals";

interface LoginModalProps extends ModalProps {
  onComplete: (title: string, content: string) => void;
}

const LoginModal: FC<LoginModalProps> = ({ onComplete, ...props }) => {
  const fields: FieldConfig[] = [
    {
      name: "username",
      label: "Username",
      initialValue: "",
      validation: Yup.string()
        .required("Username is required")
        .min(2, "Minimum 2 characters"),
    },
    {
      name: "password",
      label: "Password",
      initialValue: "",
      type: "password",
      validation: Yup.string()
        .required("Password is required")
        .min(2, "Minimum 2 characters"),
    },
  ];

  const handleSubmitForm = async (formData: any) => {
    const { username, password } = formData;
    onComplete(username, password);
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

export default LoginModal;
