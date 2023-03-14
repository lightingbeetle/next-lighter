import type { ComponentProps } from "react";
import React from "react";

import cx from "classnames";

type CardTitle = {
  /** Option to set custom tag for title */
  tag?: React.ElementType;
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

    //@ts-expect-error -- we should set displayName as property in some global d.ts file?
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
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
};

CardTitle.displayName = "CardTitle";

export default CardTitle;
