import { FC } from "react";
import { ModalProps } from "../hooks/useModal";
import Modal from "./Modal";
import * as Yup from "yup";
import DynamicForm, {
  FieldConfig,
} from "src/components/DynamicForm/DynamicForm";
import axios from "axios";

interface CreateTaskModalProps extends ModalProps {
  productId?: number;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({ productId, ...props }) => {
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
    // {
    //   name: "priority",
    //   label: "Priority",
    //   initialValue: "medium",
    //   validation: Yup.string()
    //     .oneOf(["low", "medium", "high"])
    //     .required("Priority is required"),
    //   type: "select",
    //   options: [
    //     { label: "Low", value: "low" },
    //     { label: "Medium", value: "medium" },
    //     { label: "High", value: "high" },
    //   ],
    // },
    // {
    //   name: "deadline",
    //   label: "Deadline",
    //   initialValue: "",
    //   validation: Yup.date()
    //     .nullable()
    //     .notRequired()
    //     .transform((curr, originalValue) => {
    //       return originalValue === "" ? null : curr;
    //     }),
    //   type: "datetime-local",
    // },
    // {
    //   name: "category",
    //   label: "Category",
    //   initialValue: "other",
    //   validation: Yup.string()
    //     .oneOf(["personal", "work", "health", "other"])
    //     .required("Category is required"),
    //   type: "select", // Тип select
    //   options: [
    //     { label: "Personal", value: "personal" },
    //     { label: "Work", value: "work" },
    //     { label: "Health", value: "health" },
    //     { label: "Other", value: "other" },
    //   ],
    // },
  ];

  const id = "671c18e1e02d19d05bc98803";

  const handleSubmitForm = async (formData: any) => {
    if (formData.deadline) {
      formData.deadline = new Date(formData.deadline).toISOString(); // Перетворюємо в ISO-формат
    }
    console.log("Received form data:", formData);
    try {
      const response = await axios.post("http://localhost:8000/mkr/daily", {
        ...formData,
        user: id,
      });
      console.log("Task created:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <Modal {...props}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Додавання завдання</h2>
        <div>
          <DynamicForm fields={fields} onSubmit={handleSubmitForm} />
        </div>
        {/* <div className="flex justify-end mt-4">
          <button
            onClick={handleCancel}
            className="mr-2 bg-gray-300 text-black rounded px-4 py-2"
          >
            Скасувати
          </button>
          <button
            type="submit"
            form="dynamic-form"
            className="bg-red-500 text-white rounded px-4 py-2"
          >
            Підтвердити
          </button>
        </div> */}
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
