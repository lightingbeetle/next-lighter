import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Slider } from "components";

type FilterRangeProps = {
  onSubmit: (data: any) => void;
  label: React.ReactNode;
  valueAddon?: string;
  from: {
    value: number;
    name: string;
    label: string;
  };
  to: {
    value: number;
    name: string;
    label: string;
  };
} & Omit<React.ComponentProps<typeof Slider>, "values" | "onSubmit">;

const FilterRange = ({
  onSubmit,
  from,
  to,
  label,
  min,
  max,
  stepSize,
  valueAddon,
}: FilterRangeProps) => {
  const { register, setValue, handleSubmit } = useFormContext();

  // We want to current value in the inputs while user drags handle without submiting form, so we need temporary values
  const [[fromValueTemp, toValueTemp], setTempValues] = useState([
    from.value,
    to.value,
  ]);

  return (
    <fieldset className="filter-range form-field">
      <legend className="form-label">{label}</legend>
      <Slider
        min={min}
        max={max}
        stepSize={stepSize}
        values={[fromValueTemp, toValueTemp]}
        onDrag={([fromValue, toValue]) => {
          setTempValues([fromValue, toValue]);
          // We don't submit here, becasue we want to make request after user stops dragging the handle
          setValue(from.name, fromValue);
          setValue(to.name, toValue);
        }}
        onChange={([fromValue, toValue]) => {
          setValue(from.name, fromValue);
          setValue(to.name, toValue);
          handleSubmit(onSubmit)();
        }}
      />
      <div className="filter-range__inputs">
        <Input
          type="number"
          label=""
          ariaLabel={from.label}
          id={from.name}
          name={from.name}
          addon={valueAddon}
          {...register(from.name)}
          onBlur={(e) => {
            // make sure it's number which is between min and max
            const value = Math.min(
              Math.max(parseInt(e.target.value), min),
              max
            );
            setTempValues((tempValues) => [value, tempValues[1]]);
            setValue(from.name, value);

            // don't forget to run default blur event
            register(from.name).onBlur(e);

            // and submit form
            handleSubmit(onSubmit)();
          }}
        />
        <Input
          type="number"
          label=""
          ariaLabel={from.label}
          id={to.name}
          name={to.name}
          addon={valueAddon}
          {...register(to.name)}
          onBlur={(e) => {
            const value = Math.min(
              Math.max(parseInt(e.target.value), min),
              max
            );
            setTempValues((tempValues) => [tempValues[0], value]);
            setValue(to.name, value);

            register(to.name).onBlur(e);
            handleSubmit(onSubmit)();
          }}
        />
      </div>
    </fieldset>
  );
};

export default FilterRange;
