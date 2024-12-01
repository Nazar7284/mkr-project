import { FC } from "react";
import { ModalProps } from "../hooks/useModal";
import Modal from "./Modal";
import * as Yup from "yup";
import DynamicForm, {
  FieldConfig,
} from "src/components/DynamicForm/DynamicForm";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addItemToList, createList } from "src/api/list";

interface CreateListModalProps extends ModalProps {
  selectedListId?: string | null;
}

const CreateListModal: FC<CreateListModalProps> = ({
  selectedListId,
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
  ];

  const queryClient = useQueryClient();

  const createNewList = useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  const addItem = useMutation({
    mutationFn: addItemToList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  const handleSubmitForm = async (formData: any) => {
    const { title } = formData;
    if (typeof selectedListId === "string") {
      console.log("this");
      addItem.mutate({ itemName: title, listId: selectedListId });
    } else {
      console.log("or this");
      createNewList.mutate(title);
    }
    props.onClose();
  };

  return (
    <Modal {...props}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Create list</h2>
        <div>
          <DynamicForm fields={fields} onSubmit={handleSubmitForm} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateListModal;
