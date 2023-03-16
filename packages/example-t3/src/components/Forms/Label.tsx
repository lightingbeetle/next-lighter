import React from "react";

type LabelProps = {
  isRequired?: boolean;
} & React.ComponentProps<"label">;

const Label = ({ children, isRequired, ...other }: LabelProps) => {
  return (
    <label className="form-label" {...other}>
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
