import React from "react";
import fs from "fs";
import path from "path";
import glob from "glob";
import { getMDXComponent } from "mdx-bundler/client";
import {
  mdxComponents,
  Preview,
  Code,
  Props,
  Rectangle,
  Table,
} from "@lighting-beetle/lighter-styleguide";

import DesignSystemPage from "../../components/DesignSystemPage";
import { getDesignSystemRoutes } from "../../utils";
import getMDXCode from "../../utils/getMDXCode";
import { GetStaticProps, NextPage } from "next";

type ComponentPageProps = {
  code: string;
  routes: ReturnType<typeof getDesignSystemRoutes>;
  title: string;
};

const ComponentPage: NextPage<ComponentPageProps> = ({
  routes,
  title,
  code,
}) => {
  const MDX = React.useMemo(
    () =>
      getMDXComponent(code, {
        lighterStyleguide: { Preview, Code, Props, Rectangle, Table },
      }),
    [code]
  );

  return (
    <DesignSystemPage routes={routes} title={title}>
      <MDX components={{ ...mdxComponents }} />
    </DesignSystemPage>
  );
};

export const getStaticProps: GetStaticProps<
  ComponentPageProps,
  { slug: string }
> = async function getStaticProps({ params }) {
  if (!params) {
    return {
      notFound: true,
    };
  }

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

  const { code, frontmatter } = await getMDXCode(
    source,
    pathToSource,
    params.slug
  );

  return {
    props: {
      code,
      title: frontmatter.title ?? "Default title",
      routes,
    },
  };
};

export const getStaticPaths = async function getStaticPaths() {
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
};

export default ComponentPage;
