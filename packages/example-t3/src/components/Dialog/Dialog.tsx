import cx from "classnames";
import React from "react";
import { useDialog } from "react-aria";
import Button from "../Button";
import { useModal } from "../Modal/useModal";

type DialogProps = {
  title: string;
} & React.PropsWithChildren;

function Dialog({ title, children, ...props }: DialogProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { dialogProps, titleProps } = useDialog(props, ref);
  const { close } = useModal();

  return (
    <div
      {...dialogProps}
      className={cx("dialog", dialogProps.className)}
      ref={ref}
    >
      <div className="dialog__header">
        <h3
          {...titleProps}
          className={cx("dialog__title", titleProps.className)}
        >
          {title}
        </h3>
        <Button
          purpose="secondary"
          square
          className="dialog__close"
          onClick={() => close()}
          aria-label="Close dialog"
        >
          X
        </Button>
      </div>
      <div className="dialog__content">{children}</div>
    </div>
  );
}

export default Dialog;
