import React from "react";
import cx from "classnames";

type PageBodyProps = React.ComponentProps<"div">;

const PageBody = ({ className, ...other }: PageBodyProps) => {
  const classes = cx("page-body", className);
  return <div className={classes} {...other} />;
};

export default PageBody;
