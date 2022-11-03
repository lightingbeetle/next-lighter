import { createConfig } from "@lighting-beetle/next-lighter-config";

export default createConfig({
  nextConfig: {
    experimental: {
      externalDir: true,
    },
  },
});
