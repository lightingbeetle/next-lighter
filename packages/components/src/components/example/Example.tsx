import React from "react";
import style from "./style.scss";
import useExample from "./useExample";

console.log(style);

type ExampleProps = {
  /** This is prop description */
  myProp?: string;
  myFunc?: (param: string) => void;
} & JSX.IntrinsicElements["p"];

const Example = (props: ExampleProps) => {
  const { color, onClick } = useExample();

  return (
    <p
      data-example
      className={`example example--color-${color}`}
      onClick={onClick}
      {...props}
    />
  );
};

export default Example;