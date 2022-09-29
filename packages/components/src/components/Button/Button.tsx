import React, { ComponentProps } from "react";
import cx from "classnames";
import { UrlObject } from "url";

type ButtonProps = {
  /** Button with same width as height */
  square?: boolean;
  /** Link with href attribute rendered visually as button. */
  href?: string | UrlObject;
  /** Active state */
  isActive?: boolean;
  /** Disabled state */
  isDisabled?: boolean;
  /** Button size */
  size?: "s" | "l";
  /** Visual variant of the button. Undefined means  */
  variant?: "plain";
  /** Purpose of the button. Default means CTA button. */
  purpose?: "secondary" | "link";
} & (ComponentProps<"button"> | ComponentProps<"a">);

export const Button = ({
  className,
  children,
  square,
  href,
  isActive,
  isDisabled,
  size,
  variant,
  purpose,
  ...other
}: ButtonProps) => {
  let Tag = "button";
  let buttonIsDisabled = isDisabled;

  if (href) {
    Tag = "a";
  }

  if (isDisabled && Tag === "a") {
    buttonIsDisabled = undefined;
  }

  const classes = cx(
    {
      [`btn`]: true,
      [`btn--square`]: square,
      [`btn--${size}`]: size,
      [`btn--${variant}`]: variant,
      [`btn--${purpose}`]: purpose,
      [`is-active`]: isActive,
      [`is-disabled`]: Tag === "a" && isDisabled,
    },
    className
  );

  const props = {
    disabled: buttonIsDisabled,
    href,
    className: classes,
    ...other,
  };

  return <Tag {...props}>{children}</Tag>;
};

Button.displayName = "Button";

export default Button;
