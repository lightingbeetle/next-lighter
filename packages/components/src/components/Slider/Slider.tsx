import React, { ComponentProps } from "react";
import { useRanger, RangerOptions } from "react-ranger";
import "./styles/style.scss";

// TODO: Range input could have uncontrolled mode

type SliderProps = RangerOptions;

const Slider = ({
  values,
  onChange,
  min,
  max,
  stepSize,
  onDrag,
  ...other
}: Omit<ComponentProps<"div">, "onChange" | "onDrag"> & SliderProps) => {
  const { getTrackProps, handles, segments } = useRanger({
    values,
    onChange,
    min,
    max,
    stepSize,
    onDrag,
  });

  return (
    <div className="slider" {...other}>
      <div className="slider__track" {...getTrackProps({})}>
        {segments.map(({ getSegmentProps }, index) => (
          <div
            className={`slider__segment slider__segment--${index}`}
            key={index}
            {...getSegmentProps()}
          />
        ))}
        {handles.map(({ getHandleProps }, index) => (
          <button
            key={index}
            className="slider__handle"
            {...getHandleProps()}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
