import withPlugins from "next-compose-plugins";
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

const config = ({ nextConfig } = {}) =>
  withPlugins(
    [
      [
        mdx({
          extension: /\.mdx?$/,
          options: {
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
          },
        }),
      ],
      noFS(),
    ],
    {
      pageExtensions: ["js", "jsx", "mdx", "ts", "tsx", "md"],
      ...nextConfig,
    }
  );

export default config;
