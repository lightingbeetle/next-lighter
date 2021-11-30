import React, { useMemo } from "react";
import Table from "../components/Table";

const Index = () => {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Poradie",
      accessor: "position",
      Cell: ({ value }) => `${parseInt(value)}. miesto`,
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

  return <Table columns={columns} data={data} />;
};

export default Index;
