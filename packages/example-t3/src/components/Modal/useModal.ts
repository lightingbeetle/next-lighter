import React from "react";
import type { OverlayTriggerState } from "react-stately";

type ModalContext = OverlayTriggerState;

// @ts-expect-error Should default state be recreated or null is better because it will fail instead of empty functions?
export const ModalContext = React.createContext<ModalContext>(null);

export function useModal() {
  const context = React.useContext(ModalContext);
  return context;
}
