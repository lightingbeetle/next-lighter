import React, { ComponentProps } from "react";
import cx from "classnames";

const TableHeading = ({
  className,
  children,
  ...other
}: ComponentProps<"th">) => {
  const classes = cx("table__heading", className);

  return (
    <th className={classes} {...other}>
      {typeof children === "function" ? children() : children}
    </th>
  );
};

TableHeading.displayName = "TableHeading";

export default TableHeading;
