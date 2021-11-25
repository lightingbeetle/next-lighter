import React from "react";
import FieldContext from "./FieldContext";

type LabelProps = React.ComponentProps<"label">;

const Label = ({ children }: LabelProps) => {
  const { id, isRequired } = React.useContext(FieldContext);

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
