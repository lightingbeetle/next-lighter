import React from "react";
import cx from "classnames";

type CardFooterProps = JSX.IntrinsicElements["div"];

const CLASS_ROOT = "card__footer";

const CardFooter = ({ className, ...other }: CardFooterProps) => {
  const classes = cx(CLASS_ROOT, className);

  return <div className={classes} {...other} />;
};

CardFooter.displayName = "CardFooter";

export default CardFooter;
