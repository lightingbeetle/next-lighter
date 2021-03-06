// const path = require("path");
const withPlugins = require("next-compose-plugins");
const mdx = require("@next/mdx");
const css = require("@zeit/next-css");
const sass = require("@zeit/next-sass");

const frontMatterToMDXRemarkPlugin = require("./utils/frontMatterToMDXRemarkPlugin");
const CustomEntriesBuildManifestPlugin = require("./utils/custom-entries-build-manifest-plugin");

const noFS = () => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.isServer) {
        config.node = {
          fs: "empty",
        };
      }
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

const staticEntries = ({ entriesMap }) => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      // Static entry file without React runtime.
      if (!options.isServer && entriesMap) {
        // add entriesMaps as entries to next webpack config
        const originalEntry = config.entry;
        config.entry = async () => {
          const entries = await originalEntry();

          // mutation is ok here
          Object.assign(entries, entriesMap);

          return entries;
        };

        // custom build manifest file, because next.js build-manifest.json don't contains 'static' entry and we need to know entry hash in production
        config.plugins.unshift(
          new CustomEntriesBuildManifestPlugin({
            entries: Object.keys(entriesMap),
          })
        );
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

// FIXME: This loader is not supported anymore and it was causeing memory leaks and crashing node. https://github.com/storybookjs/babel-plugin-react-docgen could be option for replacing this, but I couldn't make it work.
// const reactDocgenTypescript = ({
//   tsConfigPath = path.resolve(__dirname, "..", "..", "tsconfig.json"),
//   componentsPath = path.resolve(__dirname, "..", "components")
// }) => (nextConfig = {}) => {
//   return Object.assign({}, nextConfig, {
//     webpack(config, options) {
//       config.module.rules.push({
//         test: /\.tsx?$/,
//         include: componentsPath,
//         use: [
//           options.defaultLoaders.babel,
//           {
//             loader: require.resolve("react-docgen-typescript-loader"),
//             options: {
//               // Provide the path to your tsconfig.json so that your stories can
//               // display types from outside each individual story.
//               tsconfigPath: tsConfigPath,
//               // Filter types from node_modules, because we don't want to display them in documentation by default
//               propFilter: props =>
//                 !(
//                   props.parent && props.parent.fileName.includes("node_modules")
//                 )
//             }
//           }
//         ]
//       });

//       if (typeof nextConfig.webpack === "function") {
//         return nextConfig.webpack(config, options);
//       }

//       return config;
//     }
//   });
// };

module.exports = ({
  /* tsConfigPath, componentsPath, */ staticEntriesMap,
} = {}) =>
  withPlugins(
    [
      sass,
      css,
      [
        mdx({
          extension: /\.mdx?$/,
          options: {
            remarkPlugins: [frontMatterToMDXRemarkPlugin],
          },
        }),
      ],
      staticEntries({ entriesMap: staticEntriesMap }),
      // reactDocgenTypescript({ tsConfigPath, componentsPath }),
      noFS(),
    ],
    {
      pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    }
  );
