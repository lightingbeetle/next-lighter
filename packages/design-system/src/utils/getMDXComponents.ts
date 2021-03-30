import { Preview, Props } from "@lighting-beetle/lighter-styleguide";
import { components } from "components";

export default function getMDXComponents() {
  return {
    Preview,
    Props,
    ...components,
  };
}
