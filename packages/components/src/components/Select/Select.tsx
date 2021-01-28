import * as React from "react";
import cx from "classnames";
import { useSelect } from "downshift";

import Label from "../Label";
import DropdownMenu, { DropdownMenuItem } from "../DropdownMenu";

import "./styles/style.scss";

export type SelectProps = {
  items?: { label: string; value: string; disabled?: boolean }[];
  label?: React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
  onChange?: () => void;
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
  let initialSelectedItem = null;

  if (!placeholder && items.length) {
    initialSelectedItem = items[0];
  }

  const labelToShow = () => {
    if (!items.length) {
      return "No options";
    }

    if (!selectedItem) {
      return placeholder;
    }

    return selectedItem?.label ?? "";
  };

  const currentValue = items.find((item) => item.value === value);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString: (item) => item?.value,
    initialSelectedItem,
    selectedItem: currentValue,
    onSelectedItemChange: ({ selectedItem }) => onChange?.(selectedItem.value),
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
        {labelToShow()}
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
