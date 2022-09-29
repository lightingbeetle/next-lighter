import nextLighterConfig from "@lighting-beetle/next-lighter-config";
import nextComposePlugins from "next-compose-plugins";
import transpileModules from "next-transpile-modules";

export default nextComposePlugins
  .extend(
    nextLighterConfig({
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
    })
  )
  .withPlugins([transpileModules(["components"])]);
