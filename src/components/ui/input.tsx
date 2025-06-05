import React, { InputHTMLAttributes } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface InputProps<TFieldValues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  options?: RegisterOptions<TFieldValues>;
}

const Input = <TFieldValues extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  options,
  ...rest
}: InputProps<TFieldValues>) => {
  return (
    <div className="w-full mb-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        {...register(name, options)}
        className={`
          w-full px-3 py-1.5 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          bg-white text-gray-900
          dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
        `}
        {...rest}
      />
      {error && <p className="mt-1 text-xs italic text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
