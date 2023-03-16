import React from "react";
import type { AriaMenuOptions, AriaMenuTriggerProps } from "react-aria";
import { useMenuTrigger } from "react-aria";
import { useMenuTriggerState } from "react-stately";
import Button from "../Button/Button";

import Menu from "../Menu";

// TODO: Close on click outside is not supported - react-aria uses usePopover/Overlay for that

type ButtonMenuProps<T extends object> = AriaMenuOptions<T> &
  AriaMenuTriggerProps & {
    label: React.ReactNode;
    children: React.ReactElement | React.ReactElement[];
    onAction?: (key: string | number) => void;
  } & React.ComponentProps<typeof Button>;

function ButtonMenu<T extends object>(props: ButtonMenuProps<T>) {
  // Create state based on the incoming props
  const state = useMenuTriggerState({ type: "menu", ...props });

  // Get props for the button and menu elements
  const ref = React.useRef<HTMLButtonElement>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  return (
    <>
      <Button
        {...menuTriggerProps}
        ref={ref}
        className="no-mrg-bottom"
        {...props}
      >
        {props.label}
        <span aria-hidden="true">{state.isOpen ? "▲" : "▼"}</span>
      </Button>
      {state.isOpen && <Menu {...props} {...menuProps}></Menu>}
    </>
  );
}

export default ButtonMenu;
