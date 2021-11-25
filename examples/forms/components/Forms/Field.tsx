import React from "react";
import Label from "./Label";
import ErrorMessages, { ErrorMessagesProps } from "./ErrorMessages";
import FieldContext from "./FieldContext";
import cx from "classnames";

export type FieldProps = {
  label: React.ReactNode;
  hint?: string;
  id: string;
  isRequired?: boolean;
  hasSeparateLabel?: boolean;
  messages?: ErrorMessagesProps;
} & React.ComponentProps<"div">;

const Field = ({
  label,
  hint,
  id,
  isRequired,
  messages,
  hasSeparateLabel = true,
  children,
  className,
}: FieldProps) => {
  return (
    <div className={cx("form-field", className)}>
      <FieldContext.Provider value={{ id, isRequired }}>
        {hasSeparateLabel && label && <Label>{label}</Label>}
        {hint && <div className="small mb-xxsmall color-gray">{hint}</div>}
        {children}
        <ErrorMessages {...messages} />
      </FieldContext.Provider>
    </div>
  );
};

export default Field;
