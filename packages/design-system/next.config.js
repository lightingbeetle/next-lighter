const nextLighterConfig = require("@lighting-beetle/next-lighter-config");
const { extend } = require("next-compose-plugins");
const transpileModules = require("next-transpile-modules");

module.exports = extend(
  nextLighterConfig({
    nextConfig: {
      experimental: {
        externalDir: true,
      },
    },
  })
).withPlugins([
  transpileModules(["components", "@lighting-beetle/lighter-styleguide"]),
]);
