import { createConfig } from "@lighting-beetle/next-lighter-config";
import transpileModules from "next-transpile-modules";

/**
 * @type {import("@lighting-beetle/next-lighter-config").createConfig}
 **/
export default createConfig({
  plugins: [transpileModules(["components"])],
});
