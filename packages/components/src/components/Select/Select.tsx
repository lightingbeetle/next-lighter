import * as React from "react";
import cx from "classnames";

import useSelect from "./useSelect";
// prettier-ignore
import type { useSelectProps, Item } from "./useSelect";

import Label from "../Label";
import DropdownMenu, { DropdownMenuItem } from "../DropdownMenu";

export type SelectProps = {
  /** Items to display in dropdown list. */
  items?: useSelectProps["items"];
  /** Form element label. */
  label?: React.ReactNode;
  /** Disabled state. */
  disabled?: boolean;
  /** Texts which is shown when select don't have set value. */
  placeholder?: useSelectProps["placeholder"];
  /** Callback function on value change. */
  onChange?: (value: string) => void;
  /** Form element value. Be sure to pass `onChange` with value, because passing value makes Select controlled component. */
  value?: Item["value"];
} & Omit<JSX.IntrinsicElements["button"], "onChange" | "value">;

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

Select.displayName = 'Select';

export default Select;
