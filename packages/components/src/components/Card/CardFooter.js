import React from "react";
import cx from "classnames";

const CLASS_ROOT = "card__footer";

const CardFooter = ({ className, ...other }) => {
  const classes = cx(CLASS_ROOT, className);

  return <div className={classes} {...other} />;
};

CardFooter.displayName = "CardFooter";

export default CardFooter;
