import { useMemo } from "react";
import useSWR from "swr";
import { Column } from "react-table";

const fetcher = (url) => fetch(url).then((res) => res.json());

const usePositionsData = () => {
  const { data, error } = useSWR("/api/positions", fetcher);
  const memoizedColumns = useMemo<Column<any>[]>(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Poradie",
        accessor: "position",
        // @ts-ignore Fragment (<></>) does not work here
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
  return { data, error, memoizedColumns };
};

export default usePositionsData;
