import { createConfig } from "@lighting-beetle/next-lighter-config";
import transpileModules from "next-transpile-modules";

export default createConfig({
  nextConfig: {
    experimental: {
      externalDir: true,
    },
  },
  plugins: [
    transpileModules(["components", "@lighting-beetle/lighter-styleguide"]),
  ],
});
