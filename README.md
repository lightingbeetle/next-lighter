## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Static scope - pages without React runtime

This project support pages which don't have React runtime. Instead of that we run `components/static.ts` on this pages. This creates ability to build static pages from React components without dynamic behavior of the components (e.g. no React hooks). Static pages needs to be defined in `static-pages.ts` file.

### Implementation of static scope

1. We took static pages declared in `static-pages.ts`.
2. Custom `components/static.ts` webpack entry is added in `next.config.js` and `static-build-manifest.json` is created to get filename with hash of this entry.
3. `pags/_document.tsx` adds replace Next.js `<Head />` and `<NextScripts />` with custom `<StaticHead />` and `<StaticScrips />` on static pages. `<StaticHead />` and `<StaticScrips />` exclude React runtime and include `components/static.ts` on these pages.
4. Force `next/router` to reload page when static page should be displayed. So we make sure that we have correct document displayed in browser.

### Issues with static scope

- Static pages don't support live reloading.
- We share polyfill file with React scope.
- Not sure if `components/static.ts` are polyfilled at all
- `static-pages.ts` could be replaced with detecting of importing `components/static.ts` to page and writing that pages to `static-build-manifest.json` and removing `components/static.ts` from main bundle.
