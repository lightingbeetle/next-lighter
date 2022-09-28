import React, { ComponentProps } from "react";
import cx from "classnames";

const TableBody = ({
  className,
  children,
  ...other
}: ComponentProps<"tbody">) => {
  const classes = cx("table__body", className);

  return (
    <tbody className={classes} {...other}>
      {children}
    </tbody>
  );
};

TableBody.displayName = "TableBody";

export default TableBody;
