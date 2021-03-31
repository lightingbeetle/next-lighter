import { Preview, Props, Rectangle } from "@lighting-beetle/lighter-styleguide";
import { components } from "components";

const styleguideComponents = { Preview, Props, Rectangle };

export default function getMDXComponents() {
  return {
    ...styleguideComponents,
    ...components,
  };
}
