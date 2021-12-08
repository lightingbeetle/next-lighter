import React from "react";
import { useRanger, RangerOptions } from "react-ranger";

type RangeInputProps = RangerOptions;

const RangeInput = ({
  values,
  onChange,
  min,
  max,
  stepSize,
  onDrag,
}: RangeInputProps) => {
  const { getTrackProps, handles, segments } = useRanger({
    values,
    onChange,
    min,
    max,
    stepSize,
    onDrag,
  });

  return (
    <div className="range-input">
      <div className="range-input__track" {...getTrackProps({})}>
        {segments.map(({ getSegmentProps }, index) => (
          <div
            className={`range-input__segment range-input__segment--${index}`}
            key={index}
            {...getSegmentProps()}
          />
        ))}
        {handles.map(({ getHandleProps }, index) => (
          <button
            key={index}
            className="range-input__handle"
            {...getHandleProps()}
          />
        ))}
      </div>
    </div>
  );
};

export default RangeInput;
