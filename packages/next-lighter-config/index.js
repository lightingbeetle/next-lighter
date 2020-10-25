const path = require('path');
const withPlugins = require('next-compose-plugins');
const mdx = require('@next/mdx');
const css = require('@zeit/next-css');
const sass = require('@zeit/next-sass');

const frontMatterToMDXRemarkPlugin = require('./utils/frontMatterToMDXRemarkPlugin');
const CustomEntriesBuildManifestPlugin = require('./utils/custom-entries-build-manifest-plugin');

const staticEntries = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      // Static entry file without React runtime.
      if (!options.isServer) {
        // add './components/static.js' as entry to next webpack config
        const originalEntry = config.entry;
        config.entry = async () => {
          const entries = await originalEntry();

          entries['static'] = '../components/src/static.ts';

          return entries;
        };

        // custom build manifest file, because next.js build-manifest.json don't contains 'static' entry and we need to know entry hash in production
        config.plugins.unshift(
          new CustomEntriesBuildManifestPlugin({
            entries: ['static'],
          })
        );
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

const reactDocgenTypescript = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '..', 'components'),
        use: [
          options.defaultLoaders.babel,
          {
            loader: require.resolve('react-docgen-typescript-loader'),
            options: {
              // Provide the path to your tsconfig.json so that your stories can
              // display types from outside each individual story.
              tsconfigPath: path.resolve(
                __dirname,
                '..',
                '..',
                'tsconfig.json'
              ),
              // Filter types from node_modules, because we don't want to display them in documentation by default
              propFilter: (props) =>
                !(
                  props.parent && props.parent.fileName.includes('node_modules')
                ),
            },
          },
        ],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = () =>
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
      staticEntries,
      reactDocgenTypescript,
    ],
    {
      pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    }
  );
