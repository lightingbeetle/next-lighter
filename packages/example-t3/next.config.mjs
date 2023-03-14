// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  // INFO: react-aria is not working in strict mode
  // See: https://github.com/adobe/react-spectrum/issues/779
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};
export default config;
