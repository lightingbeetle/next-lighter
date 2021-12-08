/* eslint-disable react/jsx-key */
import cx from "classnames";
import React, { useEffect } from "react";
import { useTable, useSortBy, Column, SortingRule } from "react-table";
import useStickyTable from "./useSticky";

// TODO: types coudl better with generic insted of any
// TODO: add tests

type TableProps = {
  className?: string;
  data: any[];
  columns: Column<any>[];
  onRowClick?: (row: any) => void;
  onSort?: (sortBy: SortingRule<string>[]) => void;
  sortBy: SortingRule<string>[];
  disableSortBy?: boolean;
};

const Table = ({
  data,
  columns,
  onSort,
  sortBy: _sortBy,
  onRowClick,
  className,
  disableSortBy,
}: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      manualSortBy: true,
      disableSortBy,
      disableMultiSort: true,
      initialState: { sortBy: _sortBy },
    },
    useSortBy
  );

  const { tableRef, tableStickyRef, isSticky, top } = useStickyTable();

  useEffect(() => {
    onSort?.(sortBy);
  }, [onSort, sortBy]);

  const renderHeader = () => {
    return (
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(
                  column.canSort &&
                    column.getSortByToggleProps({
                      title: undefined,
                      // @ts-ignore I don't know how to define types for this
                      "aria-label": "prepnúť triedenie",
                    })
                )}
              >
                {column.render("Header")}
                {column.canSort && (
                  <span
                    className={cx(
                      "table__head-sorter",
                      column.isSorted
                        ? column.isSortedDesc
                          ? "table__head-sorter--desc"
                          : "table__head-sorter--asc"
                        : ""
                    )}
                  />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
    );
  };

  return (
    <div className={cx("table", className)}>
      <table
        tabIndex={-1}
        ref={tableStickyRef}
        className={cx("table--sticky", { hide: !isSticky })}
        style={{
          transform: `translate3d(0, ${top}px, 0)`,
        }}
      >
        {renderHeader()}
      </table>
      <table {...getTableProps()} ref={tableRef}>
        {renderHeader()}
        <tbody {...getTableBodyProps()}>
          <TableBody {...{ rows, prepareRow, onRowClick }} />
        </tbody>
      </table>
    </div>
  );
};

const TableBody = React.memo(
  ({
    rows,
    prepareRow,
    onRowClick,
  }: {
    rows: any;
    prepareRow: (row: any) => void;
    onRowClick: (row: any) => void;
  }) => {
    return rows.map((row) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()} onClick={() => onRowClick?.(row.original)}>
          {row.cells.map((cell) => {
            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
          })}
        </tr>
      );
    });
  }
);

TableBody.displayName = "TableBody";

export default Table;
