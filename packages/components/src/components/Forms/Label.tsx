import React from "react";
import { useField } from "./useField";

type LabelProps = React.ComponentProps<"label">;

const Label = ({ children }: LabelProps) => {
  const { id, isRequired } = useField();

  return (
    <label htmlFor={id} className="form-label">
      {children}
      {isRequired && (
        <>
          <sup> *</sup>
        </>
      )}
    </label>
  );
};
export default Label;
