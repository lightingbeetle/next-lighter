# Next-Lighter

[See live](https://next-lighter.lbx.sk)
## Quick start

`npx degit github:lightingbeetle/next-lighter my-new-project`

[Degit](https://github.com/Rich-Harris/degit) will clone this repository without git history.
### Install

Currently only `yarn` is supported for installation of this repository.

```bash
yarn
```

### Development

Run `npm run dev` in root of this repository.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Run `npm run build` in root of this repository.

## CMS (Netlify CMS)

Currently we support editing compontents documentation in git powerd Netlify CMS. This is experimental feature and may not work.

### Local development

1. Run `npx netlify-cms-proxy-server` in the root of this repository to bypass Github workflow
2. Run `npm run dev` to start local development server

## Static scope

[See more](packages/next-lighter-config)
