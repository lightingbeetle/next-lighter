import cx from "classnames";
import React from "react";
import RadioCheck from "./RadioCheck";

type ToggleProps = Parameters<typeof RadioCheck>[0];

const Toggle = ({ className, ...other }: ToggleProps, ref) => {
  return (
    <RadioCheck
      ref={ref}
      {...other}
      className={cx(className, "form-field-radiocheck--toggle")}
    />
  );
};

export default React.forwardRef(Toggle);
