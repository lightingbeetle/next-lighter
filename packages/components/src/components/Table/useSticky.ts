import { useState, useEffect, useRef, useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

const useStickyHeader = (defaultSticky = false) => {
  const [isSticky, setIsSticky] = useState(defaultSticky);
  const [top, setTop] = useState(0);
  const tableStickyRef = useRef(null);
  const tableRef = useRef(null);

  const { width } = useWindowSize();

  const toggleSticky = useCallback(
    (table, headerHeight: number, tableHeaderHeight: number) => {
      const { top, bottom } = table?.getBoundingClientRect() ?? {};
      if (
        top <= headerHeight - tableHeaderHeight &&
        bottom > headerHeight + tableHeaderHeight
      ) {
        setTop(-top + headerHeight);
        if (!isSticky) {
          setIsSticky(true);
        }
      } else if (isSticky) {
        setIsSticky(false);
      }
    },
    [isSticky]
  );

  const prepareSizes = useCallback(() => {
    const tableHeaders = Array.from(
      tableRef.current?.querySelectorAll("th")
    ).map(
      (columnHeader: Element) =>
        window
          ?.getComputedStyle(columnHeader, null)
          ?.getPropertyValue("width") ?? "auto"
    );
    Array.from(tableStickyRef.current?.querySelectorAll("th") ?? []).forEach(
      (columnHeader: HTMLElement, index) => {
        columnHeader.style.minWidth = tableHeaders?.[index];
      }
    );
  }, [tableRef, tableStickyRef, width]);

  useEffect(() => {
    if (!tableRef?.current || !tableStickyRef?.current) return;

    const headerHeight = Number(
      document?.querySelector("header")?.clientHeight ?? 70
    );
    const tableHeaderHeight = Number(
      tableRef.current.querySelector("thead")?.clientHeight ?? 42
    );

    const handleScroll = () => {
      requestAnimationFrame(() => {
        toggleSticky(tableRef?.current, headerHeight, tableHeaderHeight);
      });
    };

    // first load init
    handleScroll();
    prepareSizes();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleSticky, prepareSizes]);

  return { tableRef, tableStickyRef, isSticky, top, prepareSizes };
};

export default useStickyHeader;
