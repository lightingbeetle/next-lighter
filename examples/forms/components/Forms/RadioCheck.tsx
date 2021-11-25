import cx from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import Field, { FieldProps } from "./Field";

type RadioCheckProps = FieldProps & {
  type: "checkbox" | "radio";
  label: React.ReactNode;
} & React.ComponentProps<"input">;

const RadioCheck = React.forwardRef<HTMLInputElement, RadioCheckProps>(
  ({ type, id, name, isRequired, label, className, messages, ...props }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();

    return (
      <Field
        {...{
          id,
          name,
          label,
          isRequired,
          hasSeparateLabel: false,
          messages,
          className: cx("form-field-radiocheck", className),
        }}
      >
        <label className="form-radiocheck">
          <input
            ref={ref}
            id={id}
            type={type}
            aria-invalid={errors[name] ? "true" : "false"}
            name={name}
            {...props}
          />
          <span>{label}</span>
        </label>
      </Field>
    );
  }
);

RadioCheck.displayName = "RadioCheck";

export default RadioCheck;
