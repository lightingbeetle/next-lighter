import getConfig from "@lighting-beetle/rollup-config";
import pkg from "./package.json";

export default getConfig({
  input: ["src/index.tsx"],
  umdName: "lighter-styleguide",
  pkg
});
