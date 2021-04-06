import { Preview, Props, Rectangle } from "@lighting-beetle/lighter-styleguide";
import * as components from "components";

const styleguideComponents = { Preview, Props, Rectangle };

export default function getMDXComponents() {
  return {
    ...styleguideComponents,
    ...components,
  };
}
