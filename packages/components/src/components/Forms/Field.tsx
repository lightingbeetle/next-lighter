import React, { ComponentProps, ReactNode } from "react";
import Label from "./Label";
import ErrorMessages from "./ErrorMessages";
import FieldContext from "./FieldContext";
import cx from "classnames";

export type FieldProps = {
  label: ReactNode;
  hint?: string;
  id: string;
  isRequired?: boolean;
  hasSeparateLabel?: boolean;
  name: string;
  error?: ComponentProps<typeof ErrorMessages>;
} & ComponentProps<"div">;

const Field = ({
  label,
  hint,
  id,
  isRequired,
  error,
  name,
  hasSeparateLabel = true,
  children,
  className,
}: FieldProps) => {
  return (
    <div className={cx("form-field", className)}>
      <FieldContext.Provider value={{ id, name, isRequired, error }}>
        {hasSeparateLabel && label && <Label>{label}</Label>}
        {hint && <div className="small mb-xxsmall color-gray">{hint}</div>}
        {children}
        {error && <ErrorMessages type={error.type} message={error.message} />}
      </FieldContext.Provider>
    </div>
  );
};

export default Field;
