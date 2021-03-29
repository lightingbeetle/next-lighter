import React from "react";
import cx from "classnames";

const propTypes = {};

const CLASS_ROOT = "bar__break";

const BarBreak = ({ className, ...other }) => {
  const classes = cx(CLASS_ROOT, className);

  return <div className={classes} {...other} />;
};

BarBreak.displayName = "BarBreak";
BarBreak.propTypes = propTypes;

export default BarBreak;
