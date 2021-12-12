import { useMemo } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const usePositionsData = () => {
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
  return { data, error, memoizedColumns };
};

export default usePositionsData;
