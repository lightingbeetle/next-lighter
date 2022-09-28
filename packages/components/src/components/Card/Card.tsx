import React from "react";
import cx from "classnames";

type Card = {
  /** Adds styles signalising that card is clickable. Has to be passed manually, when using clickable card */
  isClickable?: boolean;
} & JSX.IntrinsicElements["div"];

export const CardContext = React.createContext<any>({});

const Card = ({ children, className, isClickable, ...other }: Card) => {
  const classes = cx(
    "card",
    {
      [`card--clickable`]: isClickable,
    },
    className
  );

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};

Card.displayName = "Card";

export default Card;
