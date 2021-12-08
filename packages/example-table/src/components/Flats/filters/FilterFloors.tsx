import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useFlats from "../../../hooks/useFlats";
import FilterRange from "./FilterRange";

const FilterFloors = () => {
  const { filter, setFilter, filterShape } = useFlats();
  const { setValue } = useFormContext();

  useEffect(() => {
    setFilter({
      ...filter,
      ...(filterShape?.floor_from &&
        filter.floorFrom === null && { floorFrom: filterShape?.floor_from }),
      ...(filterShape?.floor_to &&
        filter.floorTo === null && { floorTo: filterShape?.floor_to }),
    });

    if (filterShape?.floor_from && filter.floorFrom === null) {
      setValue("floorFrom", filterShape.floor_from);
    }

    if (filterShape?.floor_to && filter.floorTo === null) {
      setValue("floorTo", filterShape.floor_to);
    }
  }, [filterShape?.floor_to, filterShape?.floor_from]);

  return (
    <FilterRange
      label="Podlažie"
      min={parseInt(filterShape?.floor_from)}
      max={parseInt(filterShape?.floor_to)}
      stepSize={1}
      from={{
        value: parseInt(filter.floorFrom),
        name: "floorFrom",
        label: "Poschodie od",
      }}
      to={{
        value: parseInt(filter.floorTo),
        name: "floorTo",
        label: "Poschodie do",
      }}
      onSubmit={setFilter}
    />
  );
};

export default FilterFloors;
