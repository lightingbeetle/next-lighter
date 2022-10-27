# Example Strapi

This is example of integration between Strapi CMS backend and Next.js frontend.

[Live admin demo](https://example-strapi.onrender.com/admin) (ask Adam for access)

## Features

- [x] Blog articles displaying Strapi MDX content with help of `next-mdx-remote` package via Rest API
- [ ] Add SEO tags and settings for Strapi
- [ ] Add support for categories and tags
- [ ] Add [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) and [on-demand revalidition](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation)
- [ ] Integration of Strapi with contact form from `example-forms` (maybe migrate it here?) or similar
- [x] Preview articles with [Next.js Preview mode](https://nextjs.org/docs/advanced-features/preview-mode)
- [ ] Add example of Strapi custom fields
- [ ] Multilanguage support
- [ ] Add support of having custom components in blog body (eg. videos, contact forms)

## Local development

- `npm run dev` for local development in this package
- `npm run dev:example-strapi` in the root of this repository

## Build

- `npm run build` in this package
- `npm run build:example-strapi` in the root of this repository
