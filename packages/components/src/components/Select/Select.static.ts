import {
  useCallback,
  useEffect,
  useState,
  createElement,
  useMemo
} from "react";
import { renderToStaticMarkup } from "react-dom/server";

import hookIt from "../../utils/hookIt";
import { useSelect } from "downshift";

// hookIt is HOC function wich emulates React environment so hooks will run same as in React component
const select = hookIt((el: HTMLElement) => {
  // initially this is empty, becasue we need to look into DOM for items
  const [items, setItems] = useState<
    {
      label: string;
      value: string;
      disabled?: boolean;
    }[]
  >([]);

  // here is whole logic behind Select behaviour encapsulated in hook
  // see https://medium.com/better-programming/headless-ui-components-a-journey-with-high-order-components-render-props-and-custom-hooks-811c9677b4cf for in-depth explanation
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex
  } = useSelect({ items });

  // get DOM refs
  const button = el.querySelector("[data-select-button]");
  const list = el.querySelector("[data-select-list]");

  // we need to pass refs to useSelect functions (for some reason, it's expected)
  getToggleButtonProps().ref(button);
  getMenuProps().ref(list);

  // this will run on first render and fill items from information from DOM
  useEffect(() => {
    const itemsEl = Array.from(el.querySelectorAll("[data-select-item]"));

    setItems(
      itemsEl.map(itemEl => ({
        // text is label
        label: itemEl.textContent,
        // we store value in [data-select-item]
        value: itemEl.getAttribute("data-select-item"),
        // check if item is disabled
        disabled: itemEl.hasAttribute("disabled")
      }))
    );
  }, [el]);

  // we need to memoize event handlers so same handler will not be duplicated on every render
  const onKeyDown = useMemo(() => getMenuProps().onKeyDown, [getMenuProps]);

  // handle keyboard navigation while select is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen, onKeyDown]);

  // list items rendering
  useEffect(() => {
    // we re-render items to list because they can dynamicaly change
    // this could be removed if we don't need to update items during runtime
    // TODO: maybe we could event render here <DropdownMenuItem /> component
    list.innerHTML = renderToStaticMarkup(
      // @ts-ignore
      items.map((item, index) =>
        createElement(
          "li",
          {
            className: "dropdown-menu__item",
            "data-select-item": item.value,
            disabled: item.disabled,
            role: getItemProps({
              index,
              item
            }).option,
            id: getItemProps({
              index,
              item
            }).id,
            "aria-selected": getItemProps({ index, item })["aria-selected"]
          },
          item.label
        )
      )
    );

    // we need to get references from newely rendered items
    const itemsEl = Array.from(el.querySelectorAll("[data-select-item]"));

    // store reference to eventHandler to be able to remove it on umount
    const onHandlers = itemsEl.map((item, index) => ({
      // @ts-ignore index should be enough according the docs and so we don't need to reconstruct item shape https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#getitemprops
      onClick: getItemProps({
        index
      }).onClick,
      // @ts-ignore
      onMouseMove: getItemProps({
        index
      }).onMouseMove
    }));

    // attach event listeners on newely rendered items
    // TODO: this could be abstracted by assumption then all React event maps like 'onEventName' -> 'eventname'
    itemsEl.forEach((item, index) => {
      item.addEventListener("click", onHandlers[index].onClick);
      item.addEventListener("mousemove", onHandlers[index].onMouseMove);
    });

    // remove event listeners on unmount
    return () => {
      itemsEl.forEach((item, index) => {
        item.removeEventListener("click", onHandlers[index].onClick);
        item.removeEventListener("mousemove", onHandlers[index].onMouseMove);
      });
    };
  }, [items, list, getItemProps, el]);

  // setup button event handlers
  useEffect(() => {
    const onClick = getToggleButtonProps().onClick;
    const onKeyDown = getToggleButtonProps().onKeyDown;

    button.addEventListener("click", onClick);
    button.addEventListener("key-down", onKeyDown);

    return () => {
      button.removeEventListener("click", onClick);
      button.removeEventListener("key-down", onKeyDown);
    };
  }, [button, getToggleButtonProps]);

  // handle isOpen state of dropdown
  useEffect(() => {
    if (isOpen) {
      list.classList.remove("dropdown-menu--hidden");
      button.setAttribute("aria-expanded", "true");
    } else {
      list.classList.add("dropdown-menu--hidden");
      button.setAttribute("aria-expanded", "false");
    }
  }, [isOpen, list, button]);

  // handle selectedItem change
  useEffect(() => {
    button.innerHTML = selectedItem?.label ?? "Choose one";
    const itemsEl = Array.from(el.querySelectorAll("[data-select-item]"));

    itemsEl.forEach((item, index) => {
      item.setAttribute(
        "aria-selected",
        // @ts-ignore
        getItemProps({ index })["aria-selected"]
      );
    });
  }, [selectedItem, button, el, getItemProps]);

  // handle highlightedIndex change
  useEffect(() => {
    const itemsEl = Array.from(el.querySelectorAll("[data-select-item]"));
    list.removeAttribute("aria-activedescendat");

    itemsEl.forEach((item, index) => {
      item.classList.remove("dropdown-menu__item--highlighted");

      if (index === highlightedIndex) {
        item.classList.add("dropdown-menu__item--highlighted");
        list.setAttribute("aria-activedescendat", item.id);
      }
    });
  }, [highlightedIndex, el, list]);

  // memoize callback so it can be exposed outside of the hook
  const handleSetItems = useCallback(
    items => {
      setItems(items);
    },
    [setItems]
  );

  return {
    setItems: handleSetItems
  };
});

export default select;
