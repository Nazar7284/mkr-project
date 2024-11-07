import React from "react";
import { Controller, Control, FieldValues, FieldError } from "react-hook-form";

interface CustomInputProps {
  name: string;
  control: Control<FieldValues, any>;
  label: string;
  defaultValue?: string;
  rules?: any;
  type?: "text" | "select" | "date" | "datetime-local";
  options?: { label: string; value: string }[]; // Для select полів
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  label,
  defaultValue = "",
  rules,
  type = "text", // За замовчуванням тип "text"
  options = [], // За замовчуванням порожній масив для options
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
