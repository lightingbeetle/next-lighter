import React, { useMemo } from "react";
import { Table } from "components";
import useFlats from "../../hooks/useFlats";
import Link from "next/link";
import FlatsPagination from "./FlatsPagination";
import FlatsTableNoData from "./FlatsTableNoData";
import { formatPrice } from "../../utils/format";

const FlatsTable = () => {
  const { data, error } = useFlats();

  const DetailLink = ({ value }) => {
    return (
      <span style={{ whiteSpace: "nowrap" }}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link href="#" passHref>
          <a>{value}</a>
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
      {
        Header: "Balkón / Loggia",
        accessor: "has_balcony",
        Cell: ({ value }) => (value ? "Áno" : "Nie"),
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
        caption="Byty"
        hiddenCaption
      />
      <FlatsPagination />
    </div>
  );
};

export default FlatsTable;
