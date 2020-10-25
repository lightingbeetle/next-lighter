// TODO:
// - replace 'rollup-plugin-babel' with '@rollup/plugin-babel'

import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';

import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  input: ['src/index.ts', 'src/static.ts'],
  output: [
    {
      // file: pkg.module,
      dir: 'dist',
      format: 'es',
      sourcemap: true,
    },
    {
      // file: pkg.main,
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      plugins: [
        postcssFlexbugsFixes(),
        postcssPresetEnv({
          autoprefixer: {
            // Disable legacy flexbox support
            flexbox: 'no-2009',
          },
          // Enable CSS features that have shipped to the
          // web platform, i.e. in 2+ browsers unflagged.
          stage: 3,
          features: {
            'custom-properties': false,
          },
        }),
      ],
      minimize: true,
      sourceMap: true,
      extract: true,
    }),
    external({
      includeDependencies: true,
    }),
    typescript({
      typescript: require('typescript'),
      include: ['*.js+(|x)', '**/*.js+(|x)'],
      exclude: [
        'dist',
        'node_modules/**',
        '*.test.{js+(|x), ts+(|x)}',
        '**/*.test.{js+(|x), ts+(|x)}',
      ],
    }),
    babel({
      presets: ['next/babel'],
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    url(),
    resolve(),
    commonjs(),
    terser(),
  ],
};
