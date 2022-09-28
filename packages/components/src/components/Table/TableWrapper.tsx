import React, { ComponentProps } from "react";
import cx from "classnames";

import { useUniqueId, useStatic } from "../../utils/hooks";

import TableStatic from "./Table.static";

type TableWrapper = {
  /** TableWrapper caption, which is required due to accessibility of the table. It should always start with capitalized word */
  caption: string;
  /** If set to true, caption will be visually hidden, but remains in DOM due to accessibility  */
  hiddenCaption?: boolean;
} & ComponentProps<"div">;

const TableWrapper = ({
  className,
  children,
  caption,
  hiddenCaption = false,
  ...other
}: TableWrapper) => {
  const [tableWrapperRef] = useStatic(TableStatic);

  const classes = cx("table", className);

  const captionClasses = cx("h4 text-left", {
    [`visually-hidden`]: hiddenCaption,
  });

  const id = useUniqueId();

  return (
    <div
      className={classes}
      ref={tableWrapperRef}
      role="group"
      aria-labelledby={id}
      data-table
      {...other}
    >
      <table>
        <caption className={captionClasses} id={id}>
          {caption}
        </caption>
        {children}
      </table>
    </div>
  );
};

TableWrapper.displayName = "TableWrapper";

export default TableWrapper;
