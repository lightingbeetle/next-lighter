import React, { ComponentProps } from "react";

import TableWrapper from "./TableWrapper";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TableHeading from "./TableHeading";
import TableBody from "./TableBody";
import TableCell from "./TableCell";

type CellContent = React.ReactNode;

type Column = {
  Header: React.ReactNode;
  accessor: string | ((originalRow: any, rowIndex: number) => any);
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
  return (
    <TableWrapper
      className={className}
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
                          value:
                            typeof column.accessor === "string"
                              ? row[column.accessor]
                              : column.accessor(row, i),
                          row: row,
                          column: column,
                        })
                      : typeof column.accessor === "string"
                      ? row[column.accessor]
                      : column.accessor(row, i)}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </TableWrapper>
  );
};

Table.displayName = "Table";

export default Table;
