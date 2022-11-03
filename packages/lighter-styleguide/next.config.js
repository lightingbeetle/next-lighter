import { createConfig } from "@lighting-beetle/next-lighter-config";

/**
 * @type {import("@lighting-beetle/next-lighter-config").createConfig}
 **/
export default createConfig({
  nextConfig: {
    experimental: {
      externalDir: true,
    },
  },
});
