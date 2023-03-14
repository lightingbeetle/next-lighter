import type { ElementType } from "react";
import React from "react";
import cx from "classnames";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";
import { useObjectRef } from "@react-aria/utils";

type ButtonProps<T extends ElementType = "button"> = {
  className?: string;
  /** Button with same width as height */
  square?: boolean;
  /** Disabled state */
  isDisabled?: boolean;
  /** Button size */
  size?: "s" | "l";
  /** Visual variant of the button. Undefined means  */
  variant?: "plain";
  /** Purpose of the button. Default means CTA button. */
  purpose?: "secondary" | "link";
  /**
   * @deprecated use onPress event
   * https://react-spectrum.adobe.com/blog/building-a-button-part-1.html
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
} & AriaButtonProps<T>;

const Button = <T extends ElementType = "button">(
  props: ButtonProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const {
    elementType: ElementType = "button",
    className,
    children,
    square,
    isDisabled,
    size,
    variant,
    purpose,
    onClick,
  } = props;

  const domRef = useObjectRef(ref);
  const { buttonProps, isPressed } = useButton(props, domRef);

  const classes = cx(
    {
      [`btn`]: true,
      [`btn--square`]: square,
      [`btn--${size}`]: size,
      [`btn--${variant}`]: variant,
      [`btn--${purpose}`]: purpose,
      [`is-active`]: isPressed,
      [`is-disabled`]: isDisabled,
    },
    className
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore useObjectRef is not comaptibile with useFocusableRef we don't use
    // See https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/button/src/Button.tsx#L45
    <ElementType
      {...buttonProps}
      className={classes}
      ref={domRef}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
          console.warn("onClick is deprecated, please use onPress");
        }
      }}
    >
      {children}
    </ElementType>
  );
};

Button.displayName = "Button";

const _Button = React.forwardRef(Button);

export default _Button;
