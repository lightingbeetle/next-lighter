const typescript = require("rollup-plugin-typescript2");
const commonjs = require("@rollup/plugin-commonjs");
const postcss = require("rollup-plugin-postcss");
const resolve = require("@rollup/plugin-node-resolve").default;
const url = require("@rollup/plugin-url");
const { terser } = require("rollup-plugin-terser");
const visualizer = require("rollup-plugin-visualizer");

const postcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const postcssPresetEnv = require("postcss-preset-env");

const getConfig = ({ input: inputs, pkg, umdName, stats = false }) =>
  inputs.map(input => ({
    input,
    output: [
      {
        dir: "dist",
        format: "esm",
        exports: "named",
        sourcemap: true
      },
      {
        dir: "dist",
        format: "umd",
        name: umdName,
        esModule: false,
        exports: "named",
        sourcemap: true,
        plugins: [terser()],
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-dom/server": "ReactDOMServer"
        }
      }
    ],
    external: ["react", /react-dom/],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      postcss({
        plugins: [
          postcssFlexbugsFixes(),
          postcssPresetEnv({
            autoprefixer: {
              // Disable legacy flexbox support
              flexbox: "no-2009"
            },
            // Enable CSS features that have shipped to the
            // web platform, i.e. in 2+ browsers unflagged.
            stage: 3,
            features: {
              "custom-properties": false
            }
          })
        ],
        minimize: true,
        sourceMap: true,
        extract: true
      }),
      url(),
      stats && visualizer()
    ]
  }));

module.exports = getConfig;
