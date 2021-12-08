import React from "react";
import { useFormContext } from "react-hook-form";
import { Toggle } from "components";
import useFlats from "../../../hooks/useFlats";

const FilterRooms = () => {
  const { register, handleSubmit } = useFormContext();
  const { setFilter, filterShape } = useFlats();
  return (
    <fieldset>
      <legend className="form-label">Počet izieb</legend>
      <div className="bar">
        {Object.entries(filterShape?.rooms).map(([label, value]) => (
          <Toggle
            key={label}
            label={label}
            type="checkbox"
            value={label}
            id={`room-${label}`}
            {...register(`rooms`)}
            disabled={!value}
            onChange={(e) => {
              register("rooms").onChange(e);
              handleSubmit(setFilter)();
            }}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default FilterRooms;
