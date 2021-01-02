import fs from "fs";
import path from "path";
import glob from "glob";
import matter from "gray-matter";
import DesignSystemPage from "../../../components/DesignSystemPage";
import { getDesignSystemRoutes } from "../../../utils/getDesignSystemRoutes";

const ComponentPage = ({ filename, routes, title }) => {
  return <DesignSystemPage routes={routes} fileName={filename} title={title} />;
};

export async function getStaticProps({ params }) {
  const routes = getDesignSystemRoutes();

  const filename = path.join(
    "components",
    params.slug,
    params.slug + ".docs.mdx"
  );

  const mdxPost = fs
    .readFileSync(path.join(process.cwd(), "..", "components", "src", filename))
    .toString();

  const { data } = matter(mdxPost);

  return {
    props: {
      filename,
      title: data.title ?? "Default title",
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
