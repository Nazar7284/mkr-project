import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CustomInput from "../CustomInput/CustomInput";
import MyBtn from "../Button";

export interface FieldConfig {
  name: string;
  label: string;
  initialValue: string | undefined;
  validation?: any;
  color?: string;
  type?: "text" | "select" | "date" | "datetime-local";
  options?: { label: string; value: string }[];
}

interface DynamicFormProps {
  fields: FieldConfig[];
  onSubmit: (data: any) => void; // This is the function that will handle the form submission
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  // Створюємо валідаційну схему за допомогою Yup
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {} as Record<string, any>)
  );

  // Ініціалізуємо useForm з валідацією та значеннями полів
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.initialValue;
      return acc;
    }, {} as Record<string, any>),
  });

  // Функція для обробки відправки форми
  const handleFormSubmit: SubmitHandler<any> = (data) => {
    // Тут можна передавати дані в API або зберігати в стані
    console.log("Form Data Submitted:", data);
    // Викликаємо onSubmit, передаючи зібрані дані
    onSubmit(data);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <CustomInput
            {...field}
            key={field.name}
            name={field.name}
            control={control}
            label={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
            defaultValue={field.initialValue}
            type={field.type}
            options={field.options}
          />
        ))}
      </div>
      <MyBtn className="mt-4" type="submit" label="Відправити" />
    </form>
  );
};

export default DynamicForm;
