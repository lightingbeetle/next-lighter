import React from "react";

import Bar from "./Bar";

import "./styles/style.scss";

export default Bar;

export const BarVertical = (props) => (
  <Bar defaultDirection="vertical" {...props} />
);
BarVertical.displayName = "BarVertical";

export { default as BarItem } from "./BarItem";
export { default as BarBreak } from "./BarBreak";
