import mdx from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const noFS =
  () =>
  (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        if (!options.isServer) {
          config.resolve.fallback = { fs: false, path: false };
        }
        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  };

const createConfig =
  ({ nextConfig = {}, plugins = [] }) =>
  () => {
    const defaultConfig = {
      // our custom config
      pageExtensions: ["js", "jsx", "mdx", "ts", "tsx", "md"],
      // user passed config
      ...nextConfig,
    };

    const defaultPlugins = [
      mdx({
        extension: /\.mdx?$/,
        options: {
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        },
      }),
      noFS(),
    ];

    return [...defaultPlugins, ...plugins].reduce(
      (acc, plugin) => plugin(acc),
      defaultConfig
    );
  };

export { createConfig };
