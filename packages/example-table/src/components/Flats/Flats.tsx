import React from "react";
import FlatsFilter from "./FlatsFilter";
import FlatsTable from "./FlatsTable";
import { UseFlatsProvider } from "../../hooks/useFlats";
import { Card, CardSection } from "components";

const Flats = () => {
  return (
    <UseFlatsProvider>
      <div className="flats">
        <Card>
          <CardSection>
            <FlatsFilter />
          </CardSection>
        </Card>
        <FlatsTable />
      </div>
    </UseFlatsProvider>
  );
};

export default Flats;
