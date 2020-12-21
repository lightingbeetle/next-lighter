import getConfig from "@lighting-beetle/rollup-config";

import pkg from "./package.json";

export default getConfig({
  input: ["src/index.ts", "src/static.ts"],
  umdName: "lighter-components",
  pkg
});
