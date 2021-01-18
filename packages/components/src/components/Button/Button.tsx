import React from "react";
import cx from "classnames";
import "./styles/style.scss";

type ButtonProps = JSX.IntrinsicElements["button"] & {
  /** Button with same width as height */
  square?: boolean;
  /** Link with href attribute rendered visually as button. */
  href?: string;
  /** Active state */
  isActive?: boolean;
  /** Disabled state */
  isDisabled?: boolean;
  /** Button size */
  size?: "xs" | "s" | "l";
  /** HTML tag in which is button rendered. */
  as?: "button" | "a" | "input";
  /** Visual variant of the button. Undefined means  */
  variant?: "plain";
  /** Purpose of the button. Default means CTA button. */
  purpose?: "secondary" | "link";
};

export const Button = ({
  className,
  children,
  square,
  href,
  isActive,
  isDisabled,
  size,
  as = "button",
  variant,
  purpose,
  ...other
}: ButtonProps) => {
  let Tag: string = as;
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
      [`is-disabled`]: Tag === "a" && isDisabled
    },
    className
  );

  const props = {
    disabled: buttonIsDisabled,
    href,
    className: classes,
    ...other
  };

  return <Tag {...props}>{children}</Tag>;
};

export default Button;
