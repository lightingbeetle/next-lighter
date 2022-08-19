import React from "react";
import { useFormContext } from "react-hook-form";
import Field, { FieldProps } from "./Field";

type TextAreaProps = FieldProps & React.ComponentProps<"textarea">;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, name, isRequired, messages, ...props }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();
    return (
      <Field {...{ id, name, label, isRequired, messages }}>
        <div>
          <textarea
            ref={ref}
            id={id}
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

TextArea.displayName = "TextArea";

export default TextArea;
