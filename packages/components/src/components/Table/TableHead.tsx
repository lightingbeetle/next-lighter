import React, { ComponentProps } from "react";
import cx from "classnames";

const TableHead = ({
  className,
  children,
  ...other
}: ComponentProps<"thead">) => {
  const classes = cx("table__head", className);

  return (
    <thead className={classes} {...other}>
      {children}
    </thead>
  );
};

TableHead.displayName = "TableHead";

export default TableHead;
