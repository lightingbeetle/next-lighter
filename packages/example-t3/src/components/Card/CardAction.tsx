import type { ComponentProps } from "react";
import React from "react";

import cx from "classnames";

const CardAction = ({
  children,
  className,
  ...other
}: ComponentProps<"div">) => {
  const classes = cx("card__action", className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};

CardAction.displayName = "CardAction";

export default CardAction;
