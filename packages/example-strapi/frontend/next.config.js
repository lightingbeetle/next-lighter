import { createConfig } from "@lighting-beetle/next-lighter-config";
import transpileModules from "next-transpile-modules";

export default createConfig({
  nextConfig: {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  },
  plugins: [transpileModules(["components"])],
});
