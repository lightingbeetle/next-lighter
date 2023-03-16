import React, { forwardRef } from "react";
import cx from "classnames";

type DropdownMenuItemProps = {
  isHighlighted?: boolean;
  isDisabled?: boolean;
  isLink?: boolean;
} & JSX.IntrinsicElements["li"];

const CLASS_ROOT = "dropdown-menu__item";

const DropdownMenuItem = forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  (
    { className, children, isHighlighted, isDisabled, isLink, ...other },
    ref
  ) => {
    const classes = cx(
      CLASS_ROOT,
      { [`${CLASS_ROOT}--highlighted`]: isHighlighted },
      { [`${CLASS_ROOT}--disabled`]: isDisabled },
      { [`${CLASS_ROOT}--is-link`]: isLink },
      className
    );

    return (
      <li ref={ref} className={classes} {...other}>
        {children}
      </li>
    );
  }
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export default DropdownMenuItem;
