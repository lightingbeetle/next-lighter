import React from "react";
import { element, node, oneOfType, string } from "prop-types";
import cx from "classnames";

import Bar, { BarItem } from "../Bar";

const propTypes = {
  actions: node,
  title: oneOfType([node, string, element]),
};

const CLASS_ROOT = "card__header";

const CardHeader = ({ className, children, title, actions, ...other }) => {
  const classes = cx(CLASS_ROOT, className);
  const cardTitle = typeof title === "string" ? <h2>{title}</h2> : title;
  let headerBar = null;

  if (actions) {
    headerBar = (
      <Bar>
        <BarItem isFilling>{cardTitle}</BarItem>
        <BarItem>{actions}</BarItem>
      </Bar>
    );
  } else {
    headerBar = cardTitle;
  }

  return (
    <div className={classes} {...other}>
      {headerBar}
      {children}
    </div>
  );
};

CardHeader.displayName = "CardHeader";
CardHeader.propTypes = propTypes;

export default CardHeader;
