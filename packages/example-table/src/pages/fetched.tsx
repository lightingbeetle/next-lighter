import React, { useMemo } from "react";
// @ts-ignore
import { Table } from "components";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR("/api/positions", fetcher);

  const memoizedColumns = useMemo(
    () => [
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
    ],
    []
  );

  if (error) {
    return "Nepodarilo sa načítať dáta";
  }

  if (!data) {
    return "Načítavam...";
  }

  if (data?.length === 0) {
    return "Tabuľka je prázdna";
  }

  return <Table columns={memoizedColumns} data={data} />;
};

export default Index;
