import React, { ComponentProps } from "react";
import cx from "classnames";

import TableComponent from "./TableComponent";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TableHeading from "./TableHeading";
import TableBody from "./TableBody";
import TableCell from "./TableCell";

type CellContent = React.ReactNode;

type Column = {
  Header: React.ReactNode;
  accessor: string;
  Cell?: (value: React.ReactNode) => React.ReactNode;
};

type Row = {
  [index: string]: CellContent;
};

type Table = {
  /** Labels for columns in the table. Value of the accessor in columns match with the key name in data */
  columns: Column[];
  /** Data to print out in the table. */
  data: Row[];

  /** Table caption, which is required due to accessibility of the table. It should always start with capitalized word */
  caption: string;
  /** If set to true, caption will be visually hidden, but remains in DOM due to accessibility  */
  hiddenCaption?: boolean;
} & ComponentProps<"table">;

const Table = ({
  columns,
  data,
  className,
  caption,
  hiddenCaption = false,
  ...other
}: Table) => {
  const classes = cx({
    [`${className}`]: className,
  });

  return (
    <TableComponent
      className={classes}
      caption={caption}
      hiddenCaption={hiddenCaption}
      {...other}
    >
      <TableHead>
        <TableRow>
          {columns.map((column, i) => {
            return <TableHeading key={i}>{column.Header}</TableHeading>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => {
          return (
            <TableRow key={i}>
              {columns.map((column, i) => {
                return (
                  <TableCell key={i}>
                    {column.Cell
                      ? column.Cell({
                          value: row[column.accessor],
                          row: row,
                          column: column,
                        })
                      : row[column.accessor]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </TableComponent>
  );
};

Table.displayName = "Table";

export default Table;
