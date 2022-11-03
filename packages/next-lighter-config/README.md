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

## Options

```js
// next.config.js
import { createConfig } from "@lighting-beetle/next-lighter-config";

export default createConfig({
  nextConfig: { /* your custom next config */ },
  plugins: [/* your custom next plugins */],
});
```
