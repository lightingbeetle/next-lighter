import { createConfig } from "@lighting-beetle/next-lighter-config";
import transpileModules from "next-transpile-modules";

export default createConfig({
  plugins: [transpileModules(["components"])],
});
