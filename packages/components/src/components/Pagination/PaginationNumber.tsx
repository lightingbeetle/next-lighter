import cx from "classnames";
import React from "react";
import Button from "../Button";

type PaginationNumberProps = {
  type: "arrow" | "number";
  isActive?: boolean;
} & Parameters<typeof Button>[0];

const PaginationNumber = React.forwardRef<
  React.ComponentProps<typeof Button>,
  PaginationNumberProps
>(({ className, type, isActive, ...other }, ref) => {
  return (
    <Button
      // ref={ref}
      className={cx(
        "pagination__item",
        { [`pagination__item--${type}`]: type },
        isActive && "pagination__item--active",
        className
      )}
      // isSquare
      {...other}
    />
  );
});

PaginationNumber.displayName = "PaginationNumber";

export default PaginationNumber;
