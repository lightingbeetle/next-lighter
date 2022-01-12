import React, { ComponentProps } from "react";
import cx from "classnames";

type CardProps = ComponentProps<"div">;

const CLASS_ROOT = "card";

const Card = ({ className, ...other }: CardProps) => {
  const classes = cx(CLASS_ROOT, className);

  return <div className={classes} {...other} />;
};

Card.displayName = "Card";

export default Card;
