import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import FilterAmenities from "./filters/FilterAmenities";
import FilterPrice from "./filters/FilterPrice";
import FilterRooms from "./filters/FilterRooms";
import useFlats from "../../hooks/useFlats";

// We can't pass filter data to defaultValues until we don't have that data
const FlatsFilter = () => {
  const { isLoading, error } = useFlats();

  if (isLoading || error) {
    return <>Načítavam filter...</>;
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
  const { setFilter } = useFlats();

  return (
    <div className="flats-filter">
      <form onSubmit={handleSubmit(setFilter)}>
        {!hideHeader && <h2 className="flats-filter__header">Parametre</h2>}
        <div className="flats-filter__content">
          <FilterPrice />
          <FilterRooms />
          <FilterAmenities />
        </div>
      </form>
    </div>
  );
};

export default FlatsFilter;
