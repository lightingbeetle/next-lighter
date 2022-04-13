import React from "react";
import useFlats from "../../../hooks/useFlats";
import FilterRange from "./FilterRange";

const FilterPrice = () => {
  const { filterBase, filter, setFilter } = useFlats();

  return (
    <FilterRange
      label="Cena s DPH"
      min={parseInt(filterBase?.price_from)}
      max={parseInt(filterBase?.price_to)}
      stepSize={10000}
      from={{
        value: parseInt(filter?.price_from),
        name: "price_from",
        label: "Cena od",
      }}
      to={{
        value: parseInt(filter?.price_to),
        name: "price_to",
        label: "Cena do",
      }}
      onSubmit={setFilter}
      valueAddon="€"
    />
  );
};

export default FilterPrice;
