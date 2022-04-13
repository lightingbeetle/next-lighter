import React from "react";
// @ts-ignore
import { Table } from "components";
import { Column } from "react-table";

const StaticExample = () => {
  const columns: Column<any>[] = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Poradie",
      accessor: "position",
      Cell: ({ value }) => <>{parseInt(value)}. miesto</>,
    },
    {
      Header: "Stav",
      accessor: (row) => {
        if (row.finished) {
          return "Dokončený";
        }

        return "Plánovaný";
      },
    },
  ];

  const data = [...Array(10)].map((_item, index) => ({
    id: `${index}`,
    position: `${index}`,
    finished: !!(index % 2),
  }));

  return <Table columns={columns} data={data} sortBy={[]} disableSortBy />;
};

export default StaticExample;
