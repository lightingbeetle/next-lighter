import nextLighterConfig from "@lighting-beetle/next-lighter-config";
import nextComposePlugins from "next-compose-plugins";

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default nextComposePlugins
  .extend(
    nextLighterConfig({
      tsConfigPath: resolve(__dirname, "tsconfig.json"),
      componentsPath: resolve(__dirname, "src", "components"),
    })
  )
  .withPlugins([]);
