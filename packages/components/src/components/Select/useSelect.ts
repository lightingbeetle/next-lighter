import { useSelect as useSelectDownshift, UseSelectProps } from "downshift";

export type Item = { label: string; value: string; disabled?: boolean };

export type useSelectProps = {
  placeholder?: string;
  value?: Item["value"];
} & UseSelectProps<Item>;

function useSelect({
  placeholder,
  initialSelectedItem,
  value,
  items,
  ...other
}: useSelectProps) {
  const itemWithCurrentValue = items.find((item) => item.value === value);

  const localInitialSelectedItem =
    !initialSelectedItem && !placeholder && items.length
      ? items[0]
      : initialSelectedItem;

  const { selectedItem, ...otherDownshiftProps } = useSelectDownshift({
    items,
    selectedItem: itemWithCurrentValue,
    initialSelectedItem: localInitialSelectedItem,
    ...other,
  });

  const getLabel = ({
    items,
    selectedItem,
    placeholder,
  }: {
    items: Item[];
    selectedItem: Item;
    placeholder: string;
  }) => {
    if (!items.length) {
      return "No options";
    }

    if (!selectedItem) {
      return placeholder;
    }

    return selectedItem?.label ?? "";
  };

  return {
    selectedItem,
    ...otherDownshiftProps,
    labelText: getLabel({ items, selectedItem, placeholder }),
  };
}

export default useSelect;
