const nextLighterConfig = require("@lighting-beetle/next-lighter-config");
const { extend } = require("next-compose-plugins");
const path = require("path");

// FIX
// - this should work without .withPlugins([]), but that's probably bug in 'next-compose-plugins'
module.exports = extend(
  nextLighterConfig({
    tsConfigPath: path.resolve(__dirname, "tsconfig.json"),
    componentsPath: path.resolve(__dirname, "src", "components")
  })
).withPlugins([]);
