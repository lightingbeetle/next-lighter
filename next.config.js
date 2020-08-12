const path = require('path');
const fs = require('fs');
const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const frontMatterToMDXRemarkPlugin = require('./utils/frontMatterToMDXRemarkPlugin');
const StaticBuildManifestPlugin = require('./utils/static-build-manifest-plugin');

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
          include: path.resolve(__dirname, 'components'),
          use: [
            options.defaultLoaders.babel,
            {
              loader: require.resolve('react-docgen-typescript-loader'),
              options: {
                // Provide the path to your tsconfig.json so that your stories can
                // display types from outside each individual story.
                tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
              },
            },
          ],
        });

        // Static entry file without React runtime.
        if (!options.isServer && fs.existsSync('./components/static.ts')) {
          // add './components/static.js' as entry to next webpack config
          const originalEntry = config.entry;
          config.entry = async () => {
            const entries = await originalEntry();

            entries['static'] = './components/static.ts';

            return entries;
          };

          // custom build manifest file, because next.js build-manifest.json don't contains 'static' entry and we need to know entry hash in production
          config.plugins.push(new StaticBuildManifestPlugin());
        }
        return config;
      },
      pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    })
  )
);
