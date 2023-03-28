# components

## 0.3.0

### Minor Changes

- 9427cfb: - Remove `react-hook-form` from UI components
  - Replace `messages` prop on form elements in favor of `error` to streamline integration with `react-hook-form`
  - Improve contact form handling (validation, error handling)
  - Improve documentation of form code
  - Improve documentation of `example-forms` with examples from our work
- 0f2e580: Add Table component from project
- 263e969: Replaced Card component with Card from project and setup jest-axe for tests
- bc2a839: Move to Yarn 3 workspaces to enable independed builds
- aa55eba: Add FileUploader component from project
- d915717: Add Modal component from projects
- 8f04d19: Export scss tokens from package as `components/tokens.scss` entry
- 8e10f47: - add Slider, Pagination component
  - add example of usage of tables with fetch data & filters
  - provide next/router access to design-system .mdx pages
  - fix in PropsTable

### Patch Changes

- 9fb1016: fix TS issues
- Updated dependencies [bc2a839]
  - @lighting-beetle/lighter-hooks@1.2.0

## 0.2.0

### Minor Changes

- d444729: Updated deps
- 3d28e95: add new Card component
- 507c2a3: add example with forms
- 91f19df: Render MDX docs with next-mdx-remote to be able to SSG design system pages
- f276e28: Replace microbundle with esbuild to build libraries for much faster builds

### Patch Changes

- a4499bd: setup prettier config
- 995a39f: Display component props documentation in Design System page with `<PropsTable />`
- eb9a11d: fix typo
- Updated dependencies [a4499bd]
- Updated dependencies [d444729]
- Updated dependencies [1cb8c88]
- Updated dependencies [4c62785]
- Updated dependencies [995a39f]
- Updated dependencies [4fc65f7]
- Updated dependencies [f276e28]
  - @lighting-beetle/lighter-hooks@1.1.0
  - @lighting-beetle/lighter-styleguide@6.0.0-next.1
