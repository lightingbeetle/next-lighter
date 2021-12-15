import React from "react";
import { useFormContext } from "react-hook-form";
import { RadioCheck } from "components";
import useFlats from "../../../hooks/useFlats";

const FilterAmenities = () => {
  const { register, handleSubmit } = useFormContext();
  const { filterShape, setFilter } = useFlats();

  return (
    <fieldset>
      <legend className="form-label">Výhody</legend>
      <div className="bar">
        <RadioCheck
          key={"balcony"}
          label={"Balkón / loggia"}
          type="checkbox"
          id={`balcony`}
          {...register(`has_balcony`)}
          disabled={!filterShape.has_balcony}
          onChange={(e) => {
            register("has_balcony").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
      </div>
    </fieldset>
  );
};

export default FilterAmenities;
