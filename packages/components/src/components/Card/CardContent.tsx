import React from "react";
import cx from "classnames";

type CardContentProps = JSX.IntrinsicElements["div"] & {
  fill?: boolean;
};

const CLASS_ROOT = "card__content";

const CardContent = ({ className, fill, ...other }: CardContentProps) => {
  const classes = cx(
    CLASS_ROOT,
    {
      [`${CLASS_ROOT}--fill`]: fill,
    },
    className
  );

  return <div className={classes} {...other} />;
};

CardContent.displayName = "CardContent";

export default CardContent;
