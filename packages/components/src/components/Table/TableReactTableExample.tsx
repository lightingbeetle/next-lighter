/* eslint-disable react/jsx-key */
import React from "react";

//Import hookov z react-table knižnice
import { useTable, useRowSelect } from "react-table";

//Import jednotlivých častí tabuľky
import TableComponent from "./TableComponent";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TableHeading from "./TableHeading";
import TableBody from "./TableBody";
import TableCell from "./TableCell";

//Import dát, ktoré budú do tabuľky vykreslené
import { tableAppColumns, tableAppData } from "./TableExampleData";

const TableReactTableExample = () => {
  //Memoizácia dát, ktoré budú do tabuľky vykreslené. Bez nej by nastával nechcený rerender pri akejkoľvek interakcii s tabuľkou
  const columns = React.useMemo(() => tableAppColumns, []) as any;
  const data = React.useMemo(() => tableAppData, []) as any;

  //Zvolenie metód z useTable hooku
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Vytvorenie nového stĺpca pre checkboxy
        {
          id: "selection",
          // Pre vykreslenie checkboxu v hlavičke tabuľky môžeme použiť metódu getToggleAllRowsSelectedProps
          Header: ({ getToggleAllRowsSelectedProps }) => {
            const { indeterminate, onChange, ...props } =
              getToggleAllRowsSelectedProps();

            return (
              <div>
                <input
                  type="checkbox"
                  id={"selection-header"}
                  {...props}
                  onChange={(e) => onChange(e)}
                  title="Označiť všetky riadky"
                />
              </div>
            );
          },
          // Pre vykreslenie checkboxu v jednotlivých riadkoch tabuľky môžeme použiť metódu getToggleRowSelectedProps
          Cell: ({ row }) => {
            return (
              <input
                type="checkbox"
                id={"selection" + row.id}
                {...row.getToggleRowSelectedProps()}
                onChange={(e) =>
                  // @ts-ignore
                  row.getToggleRowSelectedProps().onChange(e)
                }
                title="Označiť riadok"
              />
            );
          },
        },
        ...columns,
      ]);
    }
  );

  //Použitie metód z useTable hooku na jednotlivé časti tabuľky
  return (
    <>
      <TableComponent {...getTableProps()} caption="Názov tabuľky">
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeading {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableHeading>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableComponent>

      {/*Výpis všetkých údajov z jednotlivých riadkov po tom, ako sú označené / odznačené */}
      <p>Označené riadky: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};

export default TableReactTableExample;
