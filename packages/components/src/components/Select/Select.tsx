import * as React from "react";
import cx from "classnames";

import useSelect from "./useSelect";
import type { useSelectProps, Item } from "./useSelect";

import Label from "../Label";
import DropdownMenu, { DropdownMenuItem } from "../DropdownMenu";

import "./styles/style.scss";

export type SelectProps = {
  items?: useSelectProps["items"];
  label?: React.ReactNode;
  disabled?: boolean;
  placeholder?: useSelectProps["placeholder"];
  onChange?: (value: string) => void;
  value?: Item["value"];
} & JSX.IntrinsicElements["button"];

const Select = ({
  items = [],
  label,
  className,
  disabled,
  placeholder = "Choose one",
  onChange,
  value,
  ...other
}: SelectProps) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    labelText,
  } = useSelect({
    items,
    itemToString: (item) => item?.value,
    onSelectedItemChange: ({ selectedItem }) => onChange?.(selectedItem.value),
    placeholder,
    value,
  });

  const classes = cx("select", className);

  return (
    <div className="form-control form-control--select" data-select>
      {label && <Label {...getLabelProps()}>{label}</Label>}
      <button
        className={classes}
        type="button"
        {...getToggleButtonProps()}
        disabled={disabled}
        data-select-button
        {...other}
      >
        {labelText}
      </button>
      <select
        hidden
        value={selectedItem?.value}
        disabled={disabled}
        // get rid of the warning if select has value without onChange
        onChange={() => {}}
      >
        {selectedItem && <option value={selectedItem.value} />}
      </select>
      <DropdownMenu {...getMenuProps()} isOpen={isOpen} data-select-list>
        {items.map((item, index) => (
          <DropdownMenuItem
            isHighlighted={highlightedIndex === index}
            isDisabled={item.disabled}
            key={`${item}${index}`}
            {...getItemProps({ item, index })}
            data-select-item={item.value}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default Select;
