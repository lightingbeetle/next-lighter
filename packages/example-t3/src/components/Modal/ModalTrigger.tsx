import React from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import Modal from "./Modal";
import { ModalContext } from "./useModal";

type ModalTrigger = {
  children: [React.ReactElement, React.ReactElement];
};

function ModalTrigger({ children, ...other }: ModalTrigger) {
  if (!Array.isArray(children) || children.length > 2) {
    throw new Error("ModalTrigger must have exactly 2 children");
  }
  // if a function is passed as the second child, it won't appear in toArray
  const [trigger, content] = children;

  const state = useOverlayTriggerState(other);
  const triggerRef = React.useRef<HTMLElement>(null);

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  return (
    <>
      {React.cloneElement(trigger, {
        ...triggerProps,
        ref: triggerRef,
      })}
      {state.isOpen && (
        <ModalContext.Provider value={state}>
          <Modal {...other} state={state} isDismissable>
            {React.cloneElement(content, overlayProps)}
          </Modal>
        </ModalContext.Provider>
      )}
    </>
  );
}

export default ModalTrigger;
