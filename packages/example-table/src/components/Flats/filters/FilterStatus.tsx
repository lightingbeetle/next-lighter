import React from "react";
import { useFormContext } from "react-hook-form";
import { RadioCheck } from "components";
import useFlats from "../../../hooks/useFlats";

const FilterStatus = () => {
  const { register, handleSubmit } = useFormContext();
  const { setFilter } = useFlats();

  return (
    <fieldset>
      <legend className="form-label">Ďalšie možnosti</legend>
      <div className="bar">
        <RadioCheck
          key={"hide-prereserved"}
          label={"Skryť predrezervované"}
          type="checkbox"
          id={`statuses-hide-prereserved`}
          {...register("hidePreReserved")}
          onChange={(e) => {
            register("hidePreReserved").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
        <RadioCheck
          key="showApartments"
          label={"Skryť apartmány"}
          type="checkbox"
          id={"showApartments"}
          {...register("showApartments")}
          onChange={(e) => {
            register("showApartments").onChange(e);
            handleSubmit(setFilter)();
          }}
        />
      </div>
    </fieldset>
  );
};

export default FilterStatus;
