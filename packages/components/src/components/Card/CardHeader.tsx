import React from "react";
import cx from "classnames";

import Bar, { BarItem } from "../Bar";

type CardHeaderProps = Omit<JSX.IntrinsicElements["div"], "title"> & {
  actions?: React.ReactNode;
  title: string | React.ReactNode;
};

const CLASS_ROOT = "card__header";

const CardHeader = ({
  className,
  children,
  title,
  actions,
  ...other
}: CardHeaderProps) => {
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

export default CardHeader;
