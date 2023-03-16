import React from "react";
import type { AriaTextFieldOptions } from "react-aria";
import { useTextField } from "react-aria";
import { useObjectRef, chain } from "@react-aria/utils";
import cx from "classnames";
import Label from "./Label";

type TextAreaProps = Omit<AriaTextFieldOptions<"textarea">, "onChange"> & {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

// NOTE: De-duplicating Textarea with Input makes Input needlessly much more complex.
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, forwardRef) => {
    const { label, onChange, ...other } = props;
    // NOTE: react-aria does not support TS types of forwarded refs
    // https://github.com/adobe/react-spectrum/pull/2293
    const ref = useObjectRef(forwardRef);
    const { labelProps, inputProps, descriptionProps, errorMessageProps } =
      useTextField({ label, ...other }, ref);

    return (
      <div className={cx("form-field", props.className)}>
        <Label {...labelProps} isRequired={props.isRequired}>
          {label}
        </Label>
        <div className="text-textarea">
          <textarea
            {...inputProps}
            ref={ref}
            onChange={(e) =>
              // NOTE: react-aria don't support event in onChange handler so we have to baypass that in order to pass event to libraries like react-hook-form or have standard React onChange signature
              // https://github.com/adobe/react-spectrum/issues/3247#issuecomment-1162293599
              chain(inputProps.onChange, () => onChange(e))
            }
          />
        </div>
        {props.description && (
          <div className="form-help" {...descriptionProps}>
            {props.description}
          </div>
        )}
        {props.errorMessage && (
          <div className="form-error" {...errorMessageProps}>
            {props.errorMessage}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
