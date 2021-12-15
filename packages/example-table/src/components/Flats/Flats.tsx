import React from "react";
import FlatsFilter from "./FlatsFilter";
import FlatsTable from "./FlatsTable";
import { UseFlatsProvider } from "../../hooks/useFlats";

const Flats = () => {
  return (
    <UseFlatsProvider>
      <div className="flats">
        <FlatsFilter />
        <FlatsTable />
      </div>
    </UseFlatsProvider>
  );
};

export default Flats;
