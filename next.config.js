const path = require('path');
const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const frontMatterToMDXRemarkPlugin = require('./src/utils/frontMatterToMDXRemarkPlugin');
const CustomEntriesBuildManifestPlugin = require('./src/utils/custom-entries-build-manifest-plugin');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [frontMatterToMDXRemarkPlugin],
  },
});

module.exports = withMDX(
  withSASS(
    withCSS({
      webpack(config, options) {
        config.module.rules.push({
          test: /\.tsx?$/,
          include: path.resolve(__dirname, 'src', 'components'),
          use: [
            options.defaultLoaders.babel,
            {
              loader: require.resolve('react-docgen-typescript-loader'),
              options: {
                // Provide the path to your tsconfig.json so that your stories can
                // display types from outside each individual story.
                tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
                // Filter types from node_modules, because we don't want to display them in documentation by default
                propFilter: (props) =>
                  !(
                    props.parent &&
                    props.parent.fileName.includes('node_modules')
                  ),
              },
            },
          ],
        });

        // Static entry file without React runtime.
        if (!options.isServer) {
          // add './components/static.js' as entry to next webpack config
          const originalEntry = config.entry;
          config.entry = async () => {
            const entries = await originalEntry();

            entries['static'] = './src/components/static.ts';

            return entries;
          };

          // custom build manifest file, because next.js build-manifest.json don't contains 'static' entry and we need to know entry hash in production
          config.plugins.unshift(
            new CustomEntriesBuildManifestPlugin({
              entries: ['static'],
            })
          );
        }

        return config;
      },
      pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    })
  )
);
