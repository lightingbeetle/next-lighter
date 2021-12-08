import React from "react";
// @ts-ignore
import { Table } from "components";
import useFetchData from "../hooks/usePositionsData";

const Index = () => {
  const { data, error, memoizedColumns } = useFetchData();

  if (error) return "Nepodarilo sa načítať dáta";
  if (!data) return "Načítavam...";
  if (data?.length === 0) return "Tabuľka je prázdna";

  return (
    <Table columns={memoizedColumns} data={data} sortBy={[]} disableSortBy />
  );
};

export default Index;
