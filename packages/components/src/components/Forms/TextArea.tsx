import React, { ComponentProps } from "react";
import Field from "./Field";

type TextAreaProps = ComponentProps<"textarea"> & ComponentProps<typeof Field>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, name, isRequired, hint, error, ...props }, ref) => {
    return (
      <Field {...{ id, name, label, hint, isRequired, error }}>
        <div>
          <textarea
            ref={ref}
            id={id}
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

TextArea.displayName = "TextArea";

export default TextArea;
