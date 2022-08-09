import React, { ComponentProps } from "react";
import cx from "classnames";

const TableRow = ({ className, children, ...other }: ComponentProps<"tr">) => {
  const classes = cx("table__row", className);

  return (
    <tr className={classes} {...other}>
      {children}
    </tr>
  );
};

TableRow.displayName = "TableRow";

export default TableRow;
