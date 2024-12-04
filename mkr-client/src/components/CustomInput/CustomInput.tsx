import React from "react";
import { Controller, Control, FieldValues, FieldError } from "react-hook-form";
import { FieldConfig } from "../DynamicForm/DynamicForm";

interface CustomInputProps extends FieldConfig {
  control: Control<FieldValues, any>;
  rules?: any;
  color?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  label,
  initialValue = "",
  rules,
  type = "text",
  options = [],
  color = "black",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={initialValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor={name} style={{ color: error ? "red" : color }}>
            {label}
          </label>

          {type === "select" ? (
            <select
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
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === "datetime-local" ? (
            <input
              {...field}
              id={name}
              type="datetime-local"
              value={field.value ? field.value.substring(0, 16) : ""}
              onChange={(e) => field.onChange(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid",
                borderColor: error ? "red" : "black",
                borderRadius: "4px",
                color: "black",
              }}
            />
          ) : (
            <input
              {...field}
              id={name}
              type={type}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid",
                borderColor: error ? "red" : "black",
                borderRadius: "4px",
                color: "black",
              }}
            />
          )}

          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </div>
      )}
    />
  );
};

export default CustomInput;
