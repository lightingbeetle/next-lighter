import React from "react";
import useFlats from "../../../hooks/useFlats";
import FilterRange from "./FilterRange";

const FilterPrice = () => {
  const { filterShape, filter, setFilter } = useFlats();

  return (
    <FilterRange
      label="Cena s DPH"
      min={parseInt(filterShape?.price_from)}
      max={parseInt(filterShape?.price_to)}
      stepSize={10000}
      from={{
        value: parseInt(filter.priceFrom),
        name: "priceFrom",
        label: "Cena od",
      }}
      to={{
        value: parseInt(filter.priceTo),
        name: "priceTo",
        label: "Cena do",
      }}
      onSubmit={setFilter}
      valueAddon="€"
    />
  );
};

export default FilterPrice;
