import React, { ComponentProps } from "react";
import cx from "classnames";

const TableCell = ({ className, children, ...other }: ComponentProps<"td">) => {
  const classes = cx("table__cell", className);

  return (
    <td className={classes} {...other}>
      {children}
    </td>
  );
};

TableCell.displayName = "TableCell";

export default TableCell;
