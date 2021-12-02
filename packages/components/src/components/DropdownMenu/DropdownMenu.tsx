import React, { forwardRef } from "react";
import cx from "classnames";

type DropdownMenuProps = { isOpen?: boolean } & JSX.IntrinsicElements["ul"];

const CLASS_ROOT = "dropdown-menu";

const DropdownMenu = forwardRef<HTMLUListElement, DropdownMenuProps>(
  ({ children, className, isOpen = false, ...other }, ref) => {
    const classes = cx(
      CLASS_ROOT,
      { [`${CLASS_ROOT}--hidden`]: !isOpen },
      className
    );

    return (
      <ul ref={ref} className={classes} {...other}>
        {children}
      </ul>
    );
  }
);

export default DropdownMenu;
