import { createContext, useContext } from "react";
import { TableInstance } from "react-table";

type TableContextType = TableInstance;

const TableContext = createContext<TableContextType | undefined>(undefined);

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error(
      `Table compound components cannot be rendered outside the Table component`
    );
  }
  return context;
}

export default TableContext;
