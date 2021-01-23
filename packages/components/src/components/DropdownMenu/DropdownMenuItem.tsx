import React, { forwardRef } from "react";
import cx from "classnames";

type DropdownMenuItemProps = {
  isHighlighted?: boolean;
} & JSX.IntrinsicElements["li"];

const CLASS_ROOT = "dropdown-menu__item";

const DropdownMenuItem = forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  ({ className, children, isHighlighted, ...other }, ref) => {
    const classes = cx(
      CLASS_ROOT,
      { [`${CLASS_ROOT}--highlighted`]: isHighlighted },
      className
    );

    return (
      <li ref={ref} className={classes} {...other}>
        {children}
      </li>
    );
  }
);

export default DropdownMenuItem;
