import React from "react";
// @ts-ignore
import { Table } from "components";
import usePositionsData from "../hooks/usePositionsData";

const Index = () => {
  const { data, error, memoizedColumns } = usePositionsData();

  if (error) return "Nepodarilo sa načítať dáta";
  if (!data) return "Načítavam...";
  if (data?.length === 0) return "Tabuľka je prázdna";

  return <Table columns={memoizedColumns} data={data} caption="Positions" />;
};

export default Index;
