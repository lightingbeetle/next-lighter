import cx from "classnames";
import React, { ComponentProps } from "react";
import Field from "./Field";

type RadioCheckProps = {
  type: "checkbox" | "radio";
  label: React.ReactNode;
} & ComponentProps<"input"> &
  ComponentProps<typeof Field>;

const RadioCheck = React.forwardRef<HTMLInputElement, RadioCheckProps>(
  ({ type, id, name, isRequired, label, className, error, ...props }, ref) => {
    return (
      <Field
        {...{
          id,
          name,
          label,
          isRequired,
          hasSeparateLabel: false,
          error,
          className: cx("form-field-radiocheck", className),
        }}
      >
        <label className="form-radiocheck">
          <input
            ref={ref}
            id={id}
            type={type}
            aria-invalid={error ? "true" : "false"}
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
