const path = require('path');
const frontMatterToMDXRemarkPlugin = require('./utils/frontMatterToMDXRemarkPlugin');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [frontMatterToMDXRemarkPlugin],
  },
});

module.exports = withMDX({
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

    // config.plugins.push(new ReactDocgenTypescriptPlugin());
    return config;
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
});
