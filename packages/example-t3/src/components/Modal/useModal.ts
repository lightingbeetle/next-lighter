import React from "react";
import type { OverlayTriggerState } from "react-stately";

type ModalContext = OverlayTriggerState;

export const ModalContext = React.createContext<ModalContext>(null);

export function useModal() {
  const context = React.useContext(ModalContext);
  return context;
}
