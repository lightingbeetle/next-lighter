import * as React from "react";
import cx from "classnames";

type LabelProps = {
  /** Error state. */
  isError?: boolean;
} & JSX.IntrinsicElements["label"];

const CLASS_ROOT = "label";

const Label = ({ className, children, isError, ...other }: LabelProps) => {
  const classes = cx(
    CLASS_ROOT,
    {
      [`label--error`]: isError,
    },
    className
  );

  return (
    <div className={classes}>
      <label {...other}>{children}</label>
    </div>
  );
};

export default Label;
