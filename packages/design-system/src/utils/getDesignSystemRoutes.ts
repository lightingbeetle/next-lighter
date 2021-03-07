import glob from "glob";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

export function getDesignSystemRoutes(prefix = "/") {
  const docsFilesMap = {
    components: glob.sync("../components/src/components/**/*.docs.mdx"),
    base: ["../components/src/tokens/tokens.docs.mdx"]
  };

  const postsMap = Object.keys(docsFilesMap).reduce((acc, dir) => {
    acc[dir] = docsFilesMap[dir].map(fileName => {
      const markdownWithMetadata = fs
        .readFileSync(path.join(process.cwd(), fileName))
        .toString();

      const { data } = matter(markdownWithMetadata);

      return {
        href: path.join(prefix, dir, path.basename(fileName, ".docs.mdx")),
        title: data.title ?? "Page Title"
      };
    });
    return acc;
  }, {});

  return [
    {
      title: "Components",
      routes: postsMap["components"]
    },
    {
      title: "Base",
      routes: postsMap["base"]
    }
  ];
}
