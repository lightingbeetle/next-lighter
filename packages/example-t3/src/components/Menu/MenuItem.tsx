import React from "react";
import { useMenuItem } from "react-aria";
import type { TreeState } from "react-stately";
import { DropdownMenuItem } from "../DropdownMenu";

type MenuItemProps<T> = {
  state: TreeState<T>;
  item: {
    rendered: React.ReactNode;
    key: string | number;
    href?: string;
  };
  onAction?: (key: string | number) => void;
};

function MenuItem<T>({ item, state, onAction }: MenuItemProps<T>) {
  // Get props for the menu item element
  const ref = React.useRef<HTMLLIElement>(null);
  const { menuItemProps, isFocused, isDisabled } = useMenuItem(
    { key: item.key, onAction },
    state,
    ref
  );
  // @ts-expect-error -- this is based on suggested workaround https://github.com/adobe/react-spectrum/issues/1244#issuecomment-1125813249
  const isLink = !!item.props.isLink;

  return (
    <DropdownMenuItem
      isHighlighted={isFocused}
      isDisabled={isDisabled}
      isLink={isLink}
      {...menuItemProps}
      ref={ref}
    >
      {item.rendered}
    </DropdownMenuItem>
  );
}

export default MenuItem;
