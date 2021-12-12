import {
  Preview,
  Props,
  Rectangle,
  H1,
} from "@lighting-beetle/lighter-styleguide";
import * as components from "components";
import React from "react";

const styleguideComponents = { Preview, Props, Rectangle, H1 };
const { tokens, ...appComponents } = components;

// FIXME: there is error with implicit export type connected to Preview react-element-to-jsx-string usage
export default function getMDXComponents(): Record<string, React.ReactNode> {
  return {
    ...styleguideComponents,
    ...appComponents,
  };
}
