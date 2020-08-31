## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Static scope - pages without Next.js runtime (React)

This project support pages which don't have Next.js runtime. Instead of that we run `components/static.ts` on these pages. This creates ability to build static pages from React components without dynamic behavior of the components (e.g. no React hooks). Static pages needs to be defined in `custom-pages.ts` file like on example.

```typescript
// custom-pages.ts
const customPages: customPages = {
  '/static': { nextRuntime: false, scripts: ['static.js'] },
};

export default customPages;
```

### Implementation of static scope

1. We took static pages declared in `custom-pages.ts`.
2. Custom `components/static.ts` webpack entry is added in `next.config.js` and `custom-entries-build-manifest.json` is created to get filename with hash of this entry in production or without hash in development.
3. `pages/_document.tsx` adds replace Next.js runtime `<Head />` and `<NextScripts />` with `<StaticHead />` and `<CustomScripts />` (if `scripts` are defined) on pages with `nextRuntime: false` flag.
4. Force `next/router` in `pages/_app.tsx` to reload page without Next.js runtime to make sure that we have correct document displayed in browser.

### Issues with no Next.js runtime

- Static pages don't support live reloading.
- We share polyfill file with React scope.
- Not sure if `components/static.ts` are polyfilled at all.

## CMS (NetlifyCMS)

### Local development

1. Run `npx netlify-cms-proxy-server` to bypass Github workflow
2. Run `npm run dev` to start local development server
