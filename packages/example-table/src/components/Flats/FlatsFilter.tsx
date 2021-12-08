import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import FilterAmenities from "./filters/FilterAmenities";
import FilterArea from "./filters/FilterArea";
import FilterFloors from "./filters/FilterFloors";
import FilterPrice from "./filters/FilterPrice";
import FilterProjects from "./filters/FilterProjects";
import FilterRooms from "./filters/FilterRooms";
import FilterStatus from "./filters/FilterStatus";
import useFlats from "../../hooks/useFlats";

// We can't pass filter data to defaultValues until we don't have that data
const FlatsFilter = () => {
  const { isLoading, error } = useFlats();

  if (isLoading || error) {
    return <>Načítavam...</>;
  }

  return <FlatsFilterForms />;
};

// At this point we are sure, we have filter data bacause FlatsFilter is handling that
const FlatsFilterForms = () => {
  const { filter } = useFlats();

  const methods = useForm({ defaultValues: filter });

  return (
    <FormProvider {...methods}>
      <div className="flats__filter">
        <FlatsFilterForm />
      </div>
    </FormProvider>
  );
};

const FlatsFilterForm = ({ hideHeader }: { hideHeader?: boolean }) => {
  const { handleSubmit } = useFormContext();
  const { setFilter, hideProjects } = useFlats();

  return (
    <div className="flats-filter">
      <form onSubmit={handleSubmit(setFilter)}>
        {!hideHeader && (
          <div className="flats-filter__header">
            <p className="small bold uppercase">Parametre</p>
          </div>
        )}
        <div className="flats-filter__content">
          <FilterPrice />
          <FilterArea />
          <FilterRooms />
          <FilterFloors />
          {!hideProjects && <FilterProjects />}
          <FilterAmenities />
          <FilterStatus />
        </div>
      </form>
    </div>
  );
};

export default FlatsFilter;
