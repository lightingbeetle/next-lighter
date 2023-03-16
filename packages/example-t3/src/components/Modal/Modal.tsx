import React from "react";
import { Overlay, useModalOverlay } from "react-aria";
import type { AriaModalOverlayProps } from "react-aria";

type ModalProps = {
  state: Parameters<typeof useModalOverlay>["1"];
} & AriaModalOverlayProps &
  React.PropsWithChildren;

function Modal({ state, children, ...props }: ModalProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay>
      <div className="modal__overlay" {...underlayProps}>
        <div className="modal" {...modalProps} ref={ref}>
          {children}
        </div>
      </div>
    </Overlay>
  );
}

export default Modal;
