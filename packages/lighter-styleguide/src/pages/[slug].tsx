import React from "react";
import fs from "fs";
import path from "path";
import glob from "glob";
import { getMDXComponent } from "mdx-bundler/client";
import bundleMDXLib from "../scripts/bundleMDXLib";

const DesignSystemPage = ({ code }) => {
  const MDX = React.useMemo(() => getMDXComponent(code), [code]);

  return <MDX />;
};

export async function getStaticProps({ params }) {
  const filename = path.join(params.slug, params.slug + ".docs.mdx");

  const pathToSource = path.join(process.cwd(), "src", "components", filename);

  const source = fs.readFileSync(pathToSource).toString();

  const { code, frontmatter } = await bundleMDXLib(
    source,
    pathToSource,
    getBaseNameFromSlugArray(params.slug)
  );

  return {
    props: {
      code,
      title: frontmatter.title ?? "Default title",
    },
  };
}

export async function getStaticPaths() {
  const docsFiles = glob.sync("src/components/**/*.docs.mdx");

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

export default DesignSystemPage;

function getBaseNameFromSlugArray(slug: string[]) {
  const lastSlug = slug.slice(-1)[0];
  const camelCaseSlug = lastSlug.replace(/-./g, (x) => x[1].toUpperCase());
  // capitalize first letter
  return camelCaseSlug.charAt(0).toUpperCase() + camelCaseSlug.slice(1);
}
