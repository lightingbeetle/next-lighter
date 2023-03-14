import React from "react";
import { useTreeState } from "react-stately";
import type { AriaMenuOptions } from "react-aria";
import { useMenu } from "react-aria";
import DropdownMenu from "../DropdownMenu";
import MenuItem from "./MenuItem";

type MenuProps<T extends object> = AriaMenuOptions<T> & {
  children: React.ReactElement | React.ReactElement[];
};

function Menu<T extends object>(props: MenuProps<T>) {
  // Create menu state based on the incoming props
  const state = useTreeState(props);

  // Get props for the menu element
  const ref = React.useRef<HTMLUListElement>(null);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <DropdownMenu isOpen ref={ref} {...menuProps}>
      {[...state.collection].map((item) => (
        <MenuItem
          key={item.key}
          item={item}
          state={state}
          onAction={props.onAction}
        />
      ))}
    </DropdownMenu>
  );
}

export default Menu;
