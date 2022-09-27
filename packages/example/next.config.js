import nextLighterConfig from "@lighting-beetle/next-lighter-config";
import nextComposePlugins from "next-compose-plugins";
import transpileModules from "next-transpile-modules";

export default nextComposePlugins
  .extend(
    nextLighterConfig({
      nextConfig: {
        experimental: {
          externalDir: true,
        },
      },
    })
  )
  .withPlugins([transpileModules(["components"])]);
