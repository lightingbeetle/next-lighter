import React, { ComponentProps } from "react";
import Field from "./Field";

type InputProps = {
  ariaLabel?: string;
  addon?: string;
} & ComponentProps<"input"> &
  ComponentProps<typeof Field>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, hint, id, isRequired, error, addon, name, ariaLabel, ...props },
    ref
  ) => {
    if (!label && !ariaLabel) {
      console.log(`Input ${id} has no label or aria-label`);
    }

    return (
      <Field {...{ id, name, label, hint, isRequired, error }}>
        <div className="text-input" {...(addon ? { "data-addon": addon } : {})}>
          <input
            ref={ref}
            id={id}
            type="text"
            aria-invalid={error ? "true" : "false"}
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
