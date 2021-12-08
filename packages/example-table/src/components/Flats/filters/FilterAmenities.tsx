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
        <RadioCheck
          key={"terrace"}
          label={"Terasa"}
          type="checkbox"
          id={`terrace`}
          {...register(`has_terrace`)}
          disabled={!filterShape.has_terrace}
          onChange={(e) => {
            register("has_terrace").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
        <RadioCheck
          key={"garden"}
          label={"Predzáhradka"}
          type="checkbox"
          id={`garden`}
          {...register(`has_garden`)}
          disabled={!filterShape.has_garden}
          onChange={(e) => {
            register("has_garden").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
        <RadioCheck
          key={"top_floor_indicator"}
          label={"Najvyššie podlažie"}
          type="checkbox"
          id={`top_floor_indicator`}
          {...register(`top_floor_indicator`)}
          disabled={!filterShape.top_floor_indicator}
          onChange={(e) => {
            register("top_floor_indicator").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
        <RadioCheck
          key={"lowest_floor_indicator"}
          label={"Najnižšie podlažie"}
          type="checkbox"
          id={`lowest_floor_indicator`}
          {...register(`lowest_floor_indicator`)}
          disabled={!filterShape.lowest_floor_indicator}
          onChange={(e) => {
            register("lowest_floor_indicator").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
        <RadioCheck
          key={"new_in_sale_indicator"}
          label={"Novinka v predaji"}
          type="checkbox"
          id={`new_in_sale_indicator`}
          {...register(`new_in_sale_indicator`)}
          disabled={!filterShape.new_in_sale_indicator}
          onChange={(e) => {
            register("new_in_sale_indicator").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
        <RadioCheck
          key={"finished_indicator"}
          label={"Dokončený byt"}
          type="checkbox"
          id={`finished_indicator`}
          {...register(`finished_indicator`)}
          disabled={!filterShape.finished_indicator}
          onChange={(e) => {
            register("finished_indicator").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
      </div>
    </fieldset>
  );
};

export default FilterAmenities;
