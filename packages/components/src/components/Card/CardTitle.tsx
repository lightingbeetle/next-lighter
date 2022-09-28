import React, { ComponentProps } from "react";

import cx from "classnames";

type CardTitle = {
  /** Option to set custom tag for title */
  tag?: string;
} & ComponentProps<"div">;

const CardTitle = ({
  tag = "h2",
  children,
  className,
  ...other
}: CardTitle) => {
  const Tag = tag;

  let isCardAction = false;

  React.Children.map(children, (element) => {
    if (!React.isValidElement(element)) return;

    //@ts-ignore
    if (element.type.displayName === "CardAction") {
      isCardAction = true;
    }
  });

  const classes = cx(
    "card__title",
    {
      [`card__title--has-link`]: isCardAction,
    },
    className
  );

  return (
    //@ts-ignore
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
};

CardTitle.displayName = "CardTitle";

export default CardTitle;
