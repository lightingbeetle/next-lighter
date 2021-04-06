import React from "react";
import { bool } from "prop-types";
import cx from "classnames";

const propTypes = {
  fill: bool,
};

const CLASS_ROOT = "card__content";

const CardContent = ({ className, fill, ...other }) => {
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
CardContent.propTypes = propTypes;

export default CardContent;
