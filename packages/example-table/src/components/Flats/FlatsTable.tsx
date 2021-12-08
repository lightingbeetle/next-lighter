import React, { useMemo } from "react";
import { Table } from "components";
import useFlats from "../../hooks/useFlats";
import Link from "next/link";
import FlatsPagination from "./FlatsPagination";
import FlatsTableNoData from "./FlatsTableNoData";
import { formatPrice } from "../../utils/format";
import { useRouter } from "next/router";

const FlatsTable = () => {
  const { data, error, sortBy, setSortBy } = useFlats();
  const router = useRouter();

  const DetailLink = ({ value }) => {
    return (
      <span style={{ whiteSpace: "nowrap" }}>
        <Link href={`/byvanie/${value}`} passHref>
          <a className="link">{value}</a>
        </Link>
      </span>
    );
  };
  const memoizedColumns = useMemo(
    () => [
      {
        id: "project",
        Header: "Projekt",
        accessor: "project",
        Cell: function ProjectCell({ value }) {
          return `Project ${value}`;
        },
      },
      {
        Header: "ID",
        accessor: "internal_id",
        Cell: DetailLink,
      },
      {
        Header: "Budova",
        accessor: "building",
      },
      {
        Header: "Izby",
        accessor: "rooms",
        Cell: ({ value }) => parseInt(value),
      },
      {
        Header: "Interiér",
        accessor: "area",
        Cell: ({ value }) => `${value}\xa0m²`,
      },
      {
        Header: "Exteriér",
        accessor: "area_exterior",
        Cell: ({ value }) => `${value}\xa0m²`,
      },
      {
        Header: "Podlažie",
        accessor: "floor",
        Cell: ({ value }) => `${value}.`,
      },
      {
        Header: "Cena",
        accessor: "price",
        Cell: ({ value }) => formatPrice(value),
      },
      {
        id: "date_of_completion",
        Header: "Termín",
        accessor: (row) => {
          if (row.finished_indicator) {
            return "Dokončený";
          }

          return row.date_of_completion;
        },
      },
      {
        Header: "Stav",
        accessor: "status_code",
        Cell: ({ value }) => {
          switch (value) {
            case "Y":
            case "P":
              return <>Dostupný</>;
            default:
              return value;
          }
        },
      },
    ],
    []
  );

  if (error) {
    return <>Nepodarilo sa načítať dáta</>;
  }

  if (!data) {
    return <>Načítavam tabuľku</>;
  }

  if (Array.isArray(data) && data.length === 0) {
    return <FlatsTableNoData />;
  }

  return (
    <div className="flats__table">
      <Table
        columns={memoizedColumns}
        data={data}
        onSort={setSortBy}
        sortBy={sortBy}
        onRowClick={(row) => router.push(`/byvanie/${row.internal_id}`)}
      />
      <FlatsPagination />
    </div>
  );
};

export default FlatsTable;
