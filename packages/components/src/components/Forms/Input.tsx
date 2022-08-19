import React from "react";
import Field, { FieldProps } from "./Field";
import { useFormContext } from "react-hook-form";

type InputProps = FieldProps & {
  ariaLabel?: string;
  addon?: string;
} & React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, hint, id, isRequired, messages, addon, name, ariaLabel, ...props },
    ref
  ) => {
    const {
      formState: { errors },
    } = useFormContext();

    if (!label && !ariaLabel) {
      console.log(`Input ${id} has no label or aria-label`);
    }

    return (
      <Field {...{ id, name, label, hint, isRequired, messages }}>
        <div className="text-input" {...(addon ? { "data-addon": addon } : {})}>
          <input
            ref={ref}
            id={id}
            type="text"
            aria-invalid={errors[name] ? "true" : "false"}
            name={name}
            required={isRequired}
            {...props}
          />
        </div>
      </Field>
    );
  }
);

Input.displayName = "Input";

export default Input;
