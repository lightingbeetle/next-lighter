import React from "react";
import useTable, { Column } from "./useTable";
import TableContext from "./useTableContext";
import TableUI from "./TableUI";

type TableProps = {
  columns: Column[];
  data: {}[];
  customUI?: React.ReactNode;
};

const Table = ({ columns, data, customUI }: TableProps) => {
  const tableInstance = useTable({ columns, data });

  return (
    <TableContext.Provider value={tableInstance}>
      {customUI || <TableUI />}
    </TableContext.Provider>
  );
};

export default Table;
