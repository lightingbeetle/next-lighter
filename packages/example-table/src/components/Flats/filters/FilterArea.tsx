import React from "react";
import useFlats from "../../../hooks/useFlats";
import FilterRange from "./FilterRange";

const FilterArea = () => {
  const { filter, filterShape, setFilter } = useFlats();

  return (
    <FilterRange
      label="Interiér"
      min={parseInt(filterShape?.area_from)}
      max={parseInt(filterShape?.area_to) + 1}
      stepSize={10}
      from={{ value: parseInt(filter.areaFrom), name: "areaFrom", label: "Od" }}
      to={{ value: parseInt(filter.areaTo), name: "areaTo", label: "Do" }}
      onSubmit={setFilter}
      valueAddon="m²"
    />
  );
};

export default FilterArea;
