import React from "react";
import cx from "classnames";

type BarItemProps = JSX.IntrinsicElements["div"] & {
  /** Bar item could shrink and wrap content if there is not enough empty space */
  canShrink?: boolean;
  /** Bar item should fill empty space */
  isFilling?: boolean;
};

export const CLASS_ROOT = "bar__item";

export const BarItem = ({
  className,
  isFilling,
  canShrink,
  ...other
}: BarItemProps) => {
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

export default BarItem;
