// CustomInput.tsx

import React from "react";
import { Controller, Control, FieldValues, FieldError } from "react-hook-form";

interface CustomInputProps {
  name: string;
  control: Control<FieldValues, any>;
  label: string;
  defaultValue?: string;
  rules?: any; // Це можна налаштувати точніше, якщо відомо, які саме правила будуть використовуватись
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  label,
  defaultValue = "",
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor={name} style={{ color: error ? "red" : "black" }}>
            {label}
          </label>
          <input
            {...field}
            id={name}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid",
              borderColor: error ? "red" : "black",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </div>
      )}
    />
  );
};

export default CustomInput;
