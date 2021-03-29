import React from "react";
import { bool } from "prop-types";
import cx from "classnames";

const propTypes = {
  /** Bar item could shrink and wrap content if there is not enough empty space */
  canShrink: bool,
  /** Bar item should fill empty space */
  isFilling: bool,
};

const CLASS_ROOT = "bar__item";

const BarItem = ({ className, isFilling, canShrink, ...other }) => {
  const classes = cx(
    CLASS_ROOT,
    {
      [`${CLASS_ROOT}--fill`]: isFilling,
      [`${CLASS_ROOT}--shrink`]: canShrink,
    },
    className
  );

  return <div className={classes} {...other} />;
};

BarItem.displayName = "BarItem";
BarItem.propTypes = propTypes;

export default BarItem;
