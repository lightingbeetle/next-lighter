# @lighting-beetle/next-lighter-config

Custom Next.js config designed for building pages without Next.js runtime.

## Quick Start

```js
// next.config.js
const nextLighterConfig = require("@lighting-beetle/next-lighter-config");
const { extend } = require("next-compose-plugins");

module.exports = extend(
  nextLighterConfig()
).withPlugins([]);
```

## Features

- MDX with frontMatter support
- CSS/SCSS
- Typescript props documentation for React components
- Compile custom entries with Next.js webpack

## Options

```js
// next.config.js
const nextLighterConfig = require("@lighting-beetle/next-lighter-config");
const { extend } = require("next-compose-plugins");

module.exports = extend(
  nextLighterConfig(/* { ...options } */)
).withPlugins([/* ...other nextjs plugins (see next-compose-plugins) */]);
```

### `tsConfigPath`

> `string` | defaults to `../../tsconfig.json`

Path to `tsconfig` file, which is used to process Typescript files.

### `componentsPath`

> `string`/`array[string]` | (defaults to `../components`)

Path to Typescript React components for generating documentation with react-docgen-typescript. 

### `staticEntriesMap`

> `{ ['entryName']: 'entry path'} | undefined

Map of static (non-react) entries which should be processed by Next.js webpack.

## Static scope - pages without Next.js runtime (React)

This project support Next.js exported pages which don't have Next.js runtime. Instead of that we run our own entires on these pages. This creates ability to build static pages from React components without dynamic behavior of the components (e.g. no React hooks).

To pass our entries to Next.js webpack we are using `@lighting-beetle/next-lighter-config` config option `staticEntriesMap`.

```typescript
// next.config.js
const nextLighterConfig = require("@lighting-beetle/next-lighter-config");
const { extend } = require("next-compose-plugins");

module.exports = extend(
  nextLighterConfig({
    staticEntriesMap: { static: "../components/src/static.ts" },
  })
).withPlugins([]);

```

Static pages needs to be defined in `custom-pages.ts` file like on example in the root of `src` folder.

```typescript
// custom-pages.ts
const customPages: customPages = {
  '/static': { nextRuntime: false, scripts: ['static.js'] },
};

export default customPages;
```

### Implementation of static scope

1. We took static pages declared in `custom-pages.ts`.
2. Custom webpack entry is added in `next.config.js` by `staticEntriesMap` of `@lighting-beetle/next-lighter-config` and `custom-entries-build-manifest.json` is created to get filename with hash of this entries in production or without hash in development.
3. `pages/_document.tsx` adds replace Next.js runtime `<Head />` and `<NextScripts />` with `<StaticHead />` and `<CustomScripts />` (if `scripts` are defined) on pages with `nextRuntime: false` flag.
4. Force `next/router` in `pages/_app.tsx` to reload page without Next.js runtime to make sure that we have correct document displayed in browser.

### Issues with no Next.js runtime

- Static pages don't support live reloading.
- We share polyfill file with React scope.
- Not sure if custom entries are polyfilled at all.