import React from "react";
import { useFormContext } from "react-hook-form";
import Field, { FieldProps } from "./Field";

export type SelectProps = FieldProps & React.ComponentProps<"select">;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, name, isRequired, messages, children, ...props }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();
    return (
      <Field {...{ id, name, label, isRequired, messages }}>
        <div className="select">
          <select
            ref={ref}
            id={id}
            aria-invalid={errors[name] ? "true" : "false"}
            name={name}
            {...props}
          >
            {children}
          </select>
        </div>
      </Field>
    );
  }
);

Select.displayName = "Select";

export default Select;
