# @lighting-beetle/next-lighter-config

Custom Next.js config designed for building pages without Next.js runtime.

## Quick Start

```js
// next.config.js
import { createConfig } from "@lighting-beetle/next-lighter-config";

export default createConfig();
```

## Features

- MDX with frontMatter support
- CSS/SCSS
- Analyze bundle size

## Options

```js
// next.config.js
import { createConfig } from "@lighting-beetle/next-lighter-config";

export default createConfig({
  /* Next.js custom config */
  nextConfig: { /* your custom next config */ },
  /* Next.js plugins */
  plugins: [/* your custom next plugins */],
  /* analyze bundle with @next/bundle-analyzer */
  analyzeBundle: false /* boolean */,
});
```
