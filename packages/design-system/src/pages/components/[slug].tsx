import React from "react";
import fs from "fs";
import path from "path";
import glob from "glob";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";

import DesignSystemPage from "../../components/DesignSystemPage";
import { getDesignSystemRoutes } from "../../utils";
import { mdxComponents } from "@lighting-beetle/lighter-styleguide";

const ComponentPage = ({ routes, title, code }) => {
  const MDX = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <DesignSystemPage routes={routes} title={title}>
      <MDX components={{ ...mdxComponents }} />
    </DesignSystemPage>
  );
};

export async function getStaticProps({ params }) {
  const routes = getDesignSystemRoutes();

  const filename = path.join(
    "components",
    params.slug,
    params.slug + ".docs.mdx"
  );

  const pathToSource = path.join(
    process.cwd(),
    "..",
    "components",
    "src",
    filename
  );

  const source = fs.readFileSync(pathToSource).toString();

  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: path.dirname(pathToSource),
    esbuildOptions: (options) => {
      options.plugins = [
        ...options.plugins,
        {
          name: "empty-(s)css-imports",
          setup(build) {
            build.onLoad({ filter: /\.(s)css$/ }, () => ({ contents: "" }));
          },
        },
      ];
      return options;
    },
  });

  return {
    props: {
      code,
      title: frontmatter.title ?? "Default title",
      routes,
    },
  };
}

export async function getStaticPaths() {
  const docsFiles = glob.sync("../components/src/components/**/*.docs.mdx");

  // Loop through all post files and create array of slugs (to create links)
  const paths = docsFiles.map((filename) => ({
    params: {
      slug: path.basename(filename, ".docs.mdx"),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default ComponentPage;
