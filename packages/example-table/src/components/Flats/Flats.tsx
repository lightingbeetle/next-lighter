import React from "react";
import FlatsFilter from "./FlatsFilter";
import FlatsTable from "./FlatsTable";
import { UseFlatsProvider } from "../../hooks/useFlats";

const Flats = ({
  projects,
}: {
  projects?: React.ComponentProps<typeof UseFlatsProvider>["projects"];
}) => {
  return (
    <UseFlatsProvider projects={projects}>
      <div className="flats">
        <FlatsFilter />
        <FlatsTable />
      </div>
    </UseFlatsProvider>
  );
};

export default Flats;
