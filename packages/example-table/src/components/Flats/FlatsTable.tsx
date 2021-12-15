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
        Header: "Cena",
        accessor: "price",
        Cell: ({ value }) => formatPrice(value),
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
