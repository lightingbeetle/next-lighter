import React from "react";
import cx from "classnames";

const CLASS_ROOT = "bar__break";

type BarBreakProps = JSX.IntrinsicElements["div"];

const BarBreak = ({ className, ...other }: BarBreakProps) => {
  const classes = cx(CLASS_ROOT, className);

  return <div className={classes} {...other} />;
};

BarBreak.displayName = "BarBreak";

export default BarBreak;
