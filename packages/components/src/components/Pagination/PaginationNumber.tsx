import cx from "classnames";
import React, { ComponentProps } from "react";
import Button from "../Button";

type PaginationNumberProps = {
  type: "arrow" | "number";
  isActive?: boolean;
} & ComponentProps<typeof Button>;

const PaginationNumber = React.forwardRef<
  React.ComponentProps<typeof Button>,
  PaginationNumberProps
>(({ className, type, isActive, ...other }, ref) => {
  return (
    <Button
      // TODO: Button should accept ref
      className={cx(
        "pagination__item",
        { [`pagination__item--${type}`]: type },
        isActive && "pagination__item--active",
        className
      )}
      {...other}
    />
  );
});

PaginationNumber.displayName = "PaginationNumber";

export default PaginationNumber;
