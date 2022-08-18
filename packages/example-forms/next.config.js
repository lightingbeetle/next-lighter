import nextLighterConfig from "@lighting-beetle/next-lighter-config";
import nextComposePlugins from "next-compose-plugins";
import transpileModules from "next-transpile-modules";

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const resolveComponents = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.resolve.extensions = [...config.resolve.extensions, "css"];

      config.resolve.alias["components"] = [
        resolve(__dirname, "..", "components", "src"),
        resolve(__dirname, "..", "components", "dist"),
      ];

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

export default nextComposePlugins
  .extend(nextLighterConfig())
  .withPlugins([transpileModules(["components"]), resolveComponents]);
