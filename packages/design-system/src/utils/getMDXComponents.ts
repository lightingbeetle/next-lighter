import { Preview, Props } from "@lighting-beetle/lighter-styleguide";
import * as appComponents from "components";

export default function getMDXComponents() {
  return {
    Preview,
    Props,
    ...appComponents
  };
}
