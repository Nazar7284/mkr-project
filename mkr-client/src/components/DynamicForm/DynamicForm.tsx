// DynamicForm.tsx

import React from "react";
import { useForm, SubmitHandler, Control } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@mui/material";
import CustomInput from "../CustomInput/CustomInput";
import MyBtn from "../Button";

interface FieldConfig {
  name: string;
  label: string;
  initialValue: string;
  validation?: any;
  color?: string;
}

interface DynamicFormProps {
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {} as Record<string, any>)
  );

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.initialValue;
      return acc;
    }, {} as Record<string, any>),
  });

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <CustomInput
            {...field}
            key={field.name}
            name={field.name}
            control={control}
            label={field.label}
            defaultValue={field.initialValue}
            rules={
              field.validation
                ? { required: field.validation.required }
                : undefined
            }
          />
        ))}
      </div>
      <MyBtn
        className="mt-4"
        label="Відправити"
        onClick={() => console.log("eee")}
      />
    </form>
  );
};

export default DynamicForm;
