const nextLighterConfig = require('@lighitng-beetle/next-lighter-config');
const { extend } = require('next-compose-plugins');
const { resolve } = require('path');
const transpileModules = require('next-transpile-modules');

const resolveComponents = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      // do something here which only gets applied during development server phase

      config.resolve.alias['components'] = resolve(
        __dirname,
        '..',
        'components',
        'src'
      );

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

// FIX
// - this should work without .withPlugins([]), but that's probably bug in 'next-compose-plugins'
module.exports = extend(nextLighterConfig()).withPlugins([
  transpileModules(['components', '@lighitng-beetle/lighter-styleguide']),
  resolveComponents,
]);
