import * as React from "react";
import cx from "classnames";
import { useSelect } from "downshift";

import Label from "../Label";
import DropdownMenu, { DropdownMenuItem } from "../DropdownMenu";

import "./styles/style.scss";

type SelectProps = {
  items?: { label: string; value: string; disabled?: boolean }[];
  label?: React.ReactNode;
  disabled?: boolean;
} & JSX.IntrinsicElements["select"];

const Select = ({
  items = [],
  label,
  className,
  disabled,
  ...other
}: SelectProps) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    items
  });

  const classes = cx("select", className);

  return (
    <div className="form-control form-control--select">
      {label && <Label {...getLabelProps()}>{label}</Label>}
      <button
        className={classes}
        type="button"
        {...getToggleButtonProps()}
        disabled={disabled}
      >
        {selectedItem?.label ?? "Elements"}
      </button>
      <select
        hidden
        value={selectedItem?.value ?? ""}
        {...other}
        disabled={disabled}
      />
      <DropdownMenu {...getMenuProps()} isOpen={isOpen}>
        {items.map((item, index) => (
          <DropdownMenuItem
            isHighlighted={highlightedIndex === index}
            isDisabled={item.disabled}
            key={`${item}${index}`}
            {...getItemProps({ item, index })}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default Select;
