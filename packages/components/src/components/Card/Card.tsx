import React from "react";
import cx from "classnames";

type Card = {
  /** Specifies if content can overflow the card boundaries */
  hasOverflow?: boolean;
  /** Adds border to whole card */
  isBordered?: boolean;
  /** Adds styles signalising that card is clickable. Has to be passed manually, when using clickable card */
  isClickable?: boolean;
} & JSX.IntrinsicElements["div"];

export const CardContext = React.createContext<any>({});

const Card = ({
  children,
  className,
  isBordered,
  isClickable,
  hasOverflow = true,
  ...other
}: Card) => {
  const classes = cx(
    "card",
    {
      [`card--disable-overflow`]: hasOverflow === false,
      [`card--bordered`]: isBordered,
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
