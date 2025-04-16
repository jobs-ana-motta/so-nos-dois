import { Field } from "formik";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function InputFormik({ name, placeholder, ...rest }: InputProps) {
  return (
    <div className="w-full flex-1">
      <Field name={name}>
        {({ field }: any) => (
          <input
            {...field}
            {...rest}
            placeholder={placeholder}
            className="border-[0.5px] border-gray-700 rounded px-3 py-2 w-full bg-card-foreground outline-none"
          />
        )}
      </Field>
    </div>
  );
}
