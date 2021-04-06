import React from "react";
import cx from "classnames";

const propTypes = {};

const CLASS_ROOT = "card";

const Card = ({ className, ...other }) => {
  const classes = cx(CLASS_ROOT, className);

  return <div className={classes} {...other} />;
};

Card.displayName = "Card";
Card.propTypes = propTypes;

export default Card;
