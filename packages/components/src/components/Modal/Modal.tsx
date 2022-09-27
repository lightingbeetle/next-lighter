import React, {
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import cx from "classnames";

import { useStatic, useUniqueId, usePortal } from "../../utils/hooks";
import canUseDom from "../../utils/canUseDom";

import ModalStatic from "./Modal.static";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";

// TODO: refactor Modal to compound component patter to increase flexibility

type Modal = {
  /** Imperative handle. Don't use uncontrolled modal anymore, it will be removed in the future. Please prefer controlled version. See Použitie section in the docs. */
  ref?: ModalImperativeHandle;
  /** CSS classes */
  className?: string;
  /** Disable closing modal on overlay click */
  closeOnOverlayClick?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  /** Footer background */
  footerBackground?: "secondary";
  /** Header content */
  header: React.ReactNode;
  /** Html id attribute */
  id?: string;
  /** On hide callback function */
  onHide?: () => void;
  /** On show callback function */
  onShow?: () => void;
  /**  Content */
  children: React.ReactNode;
  /** Whether modal is visible */
  isVisible?: boolean;
  /** Option to disable portal for enviroments where React portals are not supported */
  shouldUsePortal?: boolean;
};

type ModalImperativeHandle = {
  show: () => void;
  hide: () => void;
  modal: React.RefObject<ModalStatic>;
};

const Modal = forwardRef<ModalImperativeHandle | undefined, Modal>(
  (
    {
      className,
      children,
      id: providedId,
      closeOnOverlayClick = true,
      header,
      footer,
      footerBackground,
      onShow = () => {},
      onHide = () => {},
      isVisible = false,
      shouldUsePortal = true,
    },
    ref
  ) => {
    // <div id="root-modals" /> has to be part of the DOM for Modals to work as expected
    const target = usePortal("root-modals");

    const [modalRef, modal] = useStatic(ModalStatic, {
      onShow,
      onHide,
      portal: false,
    });

    const show = useCallback(() => {
      modal.current?.show();
    }, [modal]);

    const hide = useCallback(() => {
      modal.current?.hide();
    }, [modal]);

    useEffect(() => {
      if (isVisible) {
        show();
      } else {
        hide();
      }
    }, [isVisible, hide, show]);

    useImperativeHandle(ref, () => ({ modal, show, hide }));

    const id = useUniqueId(providedId);
    const headerId = `${id}-title`;

    const render = (
      <div
        id={id}
        data-modal
        className="dialog"
        ref={modalRef}
        aria-modal="true"
        aria-labelledby={headerId}
        {...(!isVisible && { "aria-hidden": "true" })}
      >
        <div
          className="modal__overlay"
          tabIndex={-1}
          {...(closeOnOverlayClick && { "data-a11y-dialog-hide": "" })}
        />

        <div
          className={cx("modal", className)}
          role="document"
          tabIndex={-1}
          //@ts-ignore
          autoFocus
        >
          <ModalHeader id={headerId}>{header}</ModalHeader>
          <ModalContent className={!!footer ? "" : "padding-bottom"}>
            {children}
          </ModalContent>
          {footer && (
            <ModalFooter className={footerBackground}>{footer}</ModalFooter>
          )}
        </div>
      </div>
    );

    if (canUseDom() && shouldUsePortal && target) {
      return createPortal(render, target);
    }

    return render;
  }
);

Modal.displayName = "Modal";

export default Modal;
